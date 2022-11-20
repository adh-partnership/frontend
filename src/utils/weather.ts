import type { ParsedMetar } from "@/types";
import { ZDVAPI } from "./api";

const convert = {
  celsiusToFahrenheit(celsius: number): number {
    return celsius * 1.8 + 32;
  },

  feetToMeters(feet: number): number {
    return feet * 0.3048;
  },

  milesToMeters(miles: number): number {
    return miles * 1609.344;
  },

  metersToMiles(meters: number): number {
    return meters / 1609.344;
  },

  inhgToKpa(inHg: number): number {
    return inHg / 0.29529988;
  },

  kpaToInhg(kpa: number): number {
    return kpa * 0.29529988;
  },

  kphToMps(kph: number): number {
    return (kph / 3600) * 1000;
  },

  mpsToKts(mps: number): number {
    return mps * 1.9438445;
  },

  ktsToMps(kts: number): number {
    return kts / 1.9438445;
  },
};

const parseMetar = (metarString: string): ParsedMetar => {
  const metarArray = metarString
    .trim()
    .replace(/^METAR\S*?\s/, "")
    .replace(/(\s)(\d)\s(\d)\/(\d)(SM)/, (all, a, b, c, d, e) => {
      // convert visbility range like `1 1/2 SM`
      return `${a + (Number(b) * Number(d) + Number(c))}/${d}${e}`;
    })
    .split(" ");
  if (metarArray.length < 3) {
    throw new Error("Not enough METAR information found");
  }

  const metarObject: ParsedMetar = {
    raw_text: metarString,
    raw_parts: metarArray,
    conditions: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const privateFunctions: any = {};

  /**
   * @see http://andrew.rsmas.miami.edu/bmcnoldy/Humidity.html
   * @param {Number} temp in celsius
   * @param {Number} dew  in celsius
   * @returns {Number} humidity in 1/100
   */
  privateFunctions.calcHumidity = (temp: number, dew: number) => {
    return Math.exp((17.625 * dew) / (243.04 + dew)) / Math.exp((17.625 * temp) / (243.04 + temp));
  };

  /**
   * @param {Number} value dito
   * @param {Number} toNext round to next full xxxx
   * @returns {Number} rounded value
   */
  privateFunctions.round = (value: number, toNext = 500) => {
    return Math.round(value / toNext) * toNext;
  };

  // ---------------------------------------------------------------------------

  let mode = 0;
  metarArray.forEach((metarPart) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let match: any[] | null;
    if (mode < 3 && metarPart.match(/^(\d+)(?:\/(\d+))?(SM)?$/)) {
      mode = 3; // no wind reported
    }
    if (mode < 5 && metarPart.match(/^(FEW|SCT|BKN|OVC)(\d+)?/)) {
      mode = 5; // no visibility / conditions reported
    }
    if (mode < 6 && metarPart.match(/(^M?\d+\/M?\d+$)|(^\/\/\/\/\/)/)) {
      mode = 6; // end of clouds
    }
    switch (mode) {
      case 0:
        // ICAO Code
        metarObject.icao = metarPart;
        mode = 1;
        break;
      case 1:
        // Observed Date
        match = metarPart.match(/^(\d\d)(\d\d)(\d\d)Z$/);
        if (match) {
          metarObject.observed = new Date();
          metarObject.observed.setUTCDate(Number(match[1]));
          metarObject.observed.setUTCHours(Number(match[2]));
          metarObject.observed.setUTCMinutes(Number(match[3]));
          mode = 2;
        }
        break;
      case 2:
        // Wind
        match = metarPart.match(/^(\d\d\d|VRB)P?(\d+)(?:G(\d+))?(KT|MPS|KPH)/);
        if (match) {
          match[2] = Number(match[2]);
          match[3] = match[3] ? Number(match[3]) : match[2];
          if (match[4] === "KPH") {
            match[2] = convert.kphToMps(match[2]);
            match[3] = convert.kphToMps(match[3]);
            match[4] = "MPS";
          }

          metarObject.wind = {
            degrees: match[1] === "VRB" ? 180 : Number(match[1]),
            speed_kts: match[4] === "MPS" ? convert.mpsToKts(match[2]) : match[2],
            speed_mps: match[4] === "MPS" ? match[2] : convert.ktsToMps(match[2]),
            gust_kts: match[4] === "MPS" ? convert.mpsToKts(match[3]) : match[3],
            gust_mps: match[4] === "MPS" ? match[3] : convert.ktsToMps(match[3]),
          };
          if (match[1] === "VRB") {
            metarObject.wind.degrees_from = 0;
            metarObject.wind.degrees_to = 359;
          }
          mode = 3;
        }
        break;
      case 3:
        // Visibility
        match = metarPart.match(/^(\d+)(?:\/(\d+))?(SM)?$/);
        if (match) {
          match[1] = match[2] ? Number(match[1]) / Number(match[2]) : Number(match[1]);
          metarObject.visibility = {
            miles: match[3] && match[3] === "SM" ? match[1] : convert.metersToMiles(match[1]),
            miles_float: match[3] && match[3] === "SM" ? match[1] : convert.metersToMiles(match[1]),
            meters: match[3] && match[3] === "SM" ? convert.milesToMeters(match[1]) : match[1],
            meters_float: match[3] && match[3] === "SM" ? convert.milesToMeters(match[1]) : match[1],
          };

          mode = 4;
        } else if (metarPart === "CAVOK" || metarPart === "CLR") {
          metarObject.visibility = {
            miles: "10",
            miles_float: 10,
            meters: convert.milesToMeters(10).toString(),
            meters_float: convert.milesToMeters(10),
          };
          mode = 5; // no clouds & conditions reported
        } else if (metarObject.wind) {
          // Variable wind direction
          match = metarPart.match(/^(\d+)V(\d+)$/);
          if (match) {
            metarObject.wind.degrees_from = Number(match[1]);
            metarObject.wind.degrees_to = Number(match[2]);
          }
        }
        break;
      case 4:
        // Conditions
        match = metarPart.match(/^(\+|-|VC|RE)?([A-Z][A-Z])([A-Z][A-Z])?([A-Z][A-Z])?$/);
        if (match) {
          if (!metarObject.conditions) {
            metarObject.conditions = [];
          }
          match
            .filter((m, index) => {
              return index !== 0 && m;
            })
            .forEach((m) => {
              metarObject.conditions.push({ code: m });
            });
          // may occur multiple times
        }
        break;
      case 5:
        // Clouds
        match = metarPart.match(/^(FEW|SCT|BKN|OVC)(\d+)/);
        if (match) {
          if (!metarObject.clouds) {
            metarObject.clouds = [];
          }
          match[2] = Number(match[2]) * 100;
          const cloud = {
            code: match[1],
            base_feet_agl: match[2],
            base_meters_agl: convert.feetToMeters(match[2]),
          };
          metarObject.clouds.push(cloud);
        }
        break;
      case 6:
        // Temperature
        match = metarPart.match(/^(M?\d+)\/(M?\d+)$/);
        if (match === null && metarPart.match(/^\/\/\/\/\/$/)) {
          mode = 7;
          break;
        }
        if (match) {
          match[1] = Number(match[1].replace("M", "-"));
          match[2] = Number(match[2].replace("M", "-"));
          metarObject.temperature = {
            celsius: match[1],
            fahrenheit: convert.celsiusToFahrenheit(match[1]),
          };
          metarObject.dewpoint = {
            celsius: match[2],
            fahrenheit: convert.celsiusToFahrenheit(match[2]),
          };
          metarObject.humidity_percent = privateFunctions.calcHumidity(match[1], match[2]) * 100;
          mode = 7;
        }
        break;
      case 7:
        // Pressure
        match = metarPart.match(/^(Q|A)(\d+)/);
        if (match) {
          match[2] = Number(match[2]);
          match[2] /= match[1] === "Q" ? 10 : 100;
          metarObject.barometer = {
            hg: match[1] === "Q" ? convert.kpaToInhg(match[2]) : match[2],
            kpa: match[1] === "Q" ? match[2] : convert.inhgToKpa(match[2]),
            mb: match[1] === "Q" ? match[2] * 10 : convert.inhgToKpa(match[2] * 10),
          };
          mode = 8;
        }
        break;
      default:
        break;
    }
  });

  if (!metarObject.visibility) {
    metarObject.visibility = {
      miles: "10",
      miles_float: 10,
      meters: convert.milesToMeters(10).toString(),
      meters_float: convert.milesToMeters(10),
    };
  }

  // Finishing touches

  metarObject.visibility.miles = String(privateFunctions.round(metarObject.visibility.miles, 0.5));
  metarObject.visibility.meters = String(privateFunctions.round(metarObject.visibility.meters));

  if (metarObject.clouds) {
    const highestCloud = metarObject.clouds[metarObject.clouds.length - 1];
    metarObject.ceiling = {
      code: highestCloud.code,
      feet_agl: highestCloud.base_feet_agl,
      meters_agl: highestCloud.base_meters_agl,
    };
  }

  metarObject.flight_category = "";
  if (metarObject.visibility.miles_float > 5 && (!metarObject.ceiling || metarObject.ceiling.feet_agl > 3000)) {
    metarObject.flight_category = "VFR";
  } else if (
    metarObject.visibility.miles_float >= 3 &&
    (!metarObject.ceiling || metarObject.ceiling.feet_agl >= 1000)
  ) {
    metarObject.flight_category = "MVFR";
  } else if (metarObject.visibility.miles_float >= 1 && (!metarObject.ceiling || metarObject.ceiling.feet_agl >= 500)) {
    metarObject.flight_category = "IFR";
  } else {
    metarObject.flight_category = "LIFR";
  }

  return metarObject;
};

const getMetars = async (stations: string | string[]): Promise<string> => {
  const s: string[] = typeof stations === "string" ? [stations] : stations;

  const metars = await ZDVAPI.get(`/v1/proxy/metar/${s.join(",")}`);
  return metars.data;
};

const getTAF = async (station: string): Promise<string> => {
  const taf = await ZDVAPI.get(`/v1/proxy/taf/${station}`);
  return taf.data;
};

const getFlightCategory = (metar: string): string | undefined => {
  const metarObject = parseMetar(metar);
  return metarObject.flight_category;
};

export default {
  getFlightCategory,
  getMetars,
  getTAF,
  parseMetar,
};
