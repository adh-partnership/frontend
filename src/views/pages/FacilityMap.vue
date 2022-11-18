<template>
  <div>
    <h1 class="text-2xl">Facility Map</h1>

    <div id="map" style="width: 100%; min-height: 600px" class="z-20"></div>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { onMounted, onUnmounted, ref, Ref } from "vue";
import axios from "axios";
import Facility from "@/facility";
import leaflet from "leaflet";
import type { ParsedMetar } from "@/types";
import Weather from "@/utils/weather";

let map: leaflet.Map;
let metarLayer: leaflet.LayerGroup;
let nexradLayer: leaflet.Layer;
let updateTimer: ReturnType<typeof setInterval>;
const weather: Ref<{ [key: string]: ParsedMetar | null }> = ref({});
const tafs: Ref<{ [key: string]: string | null }> = ref({});
const airportMarkers: Ref<{ [key: string]: leaflet.Marker }> = ref({});

const updatePopups = (): void => {
  Facility.airports.forEach((airport) => {
    airportMarkers.value[airport.icao].bindTooltip(
      `<table class="tooltip-table">
        <tr class="border-b-1"><td class="px-2 text-xl">
          <button class="wx-badge wx-badge-${weather.value[airport.icao]?.flight_category?.toLowerCase()}">
            ${weather.value[airport.icao]?.flight_category}
          </button>
          <b>${airport.name}</b> (${airport.icao})</td></tr>
      <tr class="border-b-1"><td><small><b>METAR</b>:<pre>${
        weather.value[airport.icao]?.raw_text
      }</pre></small></td></tr>
        <tr><td><small><b>TAF</b>: <pre>${
          tafs.value[airport.icao] || "<i>No TAF Available</i></div>"
        }</pre></small></td></tr></table>`,
      {
        opacity: 1,
        direction: "auto",
      }
    );
  });
};

const updateWeather = (): void => {
  Facility.airports.forEach((airport) => {
    Weather.getMetars(airport.icao).then((metar) => {
      weather.value[airport.icao] = Weather.parseMetar(metar);
      airportMarkers.value[airport.icao].setIcon(
        leaflet.icon({
          iconUrl: `/assets/images/map/${weather.value[airport.icao]?.flight_category?.toLowerCase() || "unknown"}.png`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        })
      );
      updatePopups();
    });
  });
};

const updateTAFs = (): void => {
  Facility.airports.forEach((airport) => {
    Weather.getTAF(airport.icao).then((taf: string) => {
      tafs.value[airport.icao] = taf;
      updatePopups();
    });
  });
};

const updateNexrad = async (): Promise<void> => {
  const response = await axios.get("https://tilecache.rainviewer.com/api/maps.json");
  const { data } = response;
  const ts = data[0];

  if (nexradLayer) {
    map.removeLayer(nexradLayer);
  }

  nexradLayer = leaflet
    .tileLayer(`https://tilecache.rainviewer.com/v2/radar/${ts}/512/{z}/{x}/{y}/6/0_1.png`, {
      tileSize: 256,
      opacity: 0.5,
      attribution: "Weather data © 2012-2020 <a href='https://www.rainviewer.com'>RainViewer</a>",
    })
    .addTo(map);
};

onMounted(() => {
  map = leaflet.map("map").setView(Facility.center, Facility.defaultZoom);
  leaflet
    .tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: "abcd",
      maxZoom: 20,
    })
    .addTo(map);

  leaflet.polygon(Facility.boundaries.center, { color: "white", fillOpacity: 0.05 }).addTo(map);
  map.fitBounds(Facility.boundaries.center);
  map.attributionControl.setPosition("topright");
  map.attributionControl.setPrefix(
    `<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>`
  ); // Remove Ukraine flag but leave proper attribution

  metarLayer = leaflet.layerGroup(Object.values(airportMarkers.value)).addTo(map);
  Facility.airports.forEach((airport) => {
    weather.value[airport.icao] = null;
    tafs.value[airport.icao] = null;
    airportMarkers.value[airport.icao] = leaflet
      .marker(new leaflet.LatLng(airport.latitude, airport.longitude), {
        icon: leaflet.icon({
          iconUrl: "/assets/images/map/unknown.png",
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
      })
      .addTo(metarLayer);
  });

  updateNexrad();
  updateWeather();
  updateTAFs();

  updateTimer = setInterval(() => {
    updateNexrad();
    updateWeather();
    updateTAFs();
  }, 5 * 60000); // every 5 minutes
});

onUnmounted(() => {
  clearInterval(updateTimer);
});
</script>

<style lang="postcss">
.leaflet-tooltip table tbody tr td pre {
  @apply pb-2;
}
.leaflet-tooltip table tbody tr td {
  @apply px-2;
}

.wx-badge {
  @apply text-center text-lg font-bold uppercase rounded-md px-2;
  @apply text-white;
  @apply border-1 border-white;
}

.wx-badge-vfr {
  @apply bg-green-700;
}

.wx-badge-mvfr {
  @apply bg-blue-900;
}

.wx-badge-ifr {
  @apply bg-red-900;
}

.wx-badge-lifr {
  @apply bg-purple-900;
}
</style>

<style>
.leaflet-control-attribution {
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgba(255, 255, 255, 0.15);
  font-family: "Jost", sans-serif;
}

.leaflet-control-attribution > a {
  color: rgba(255, 255, 255, 0.15);
}

.leaflet-tooltip {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: none;
  white-space: normal;
  width: 20rem;
}

.leaflet-tooltip::before {
  border-right-color: rgba(0, 0, 0, 0) !important;
}

.leaflet-tooltip-left::before {
  border-left-color: rgba(0, 0, 0, 0) !important;
}

.tooltip-table {
  max-width: 20rem;
  color: #eee;
  font-size: 0.9rem;
  background-color: rgb(0, 0, 0);
  border: 1px solid white;
}
</style>
