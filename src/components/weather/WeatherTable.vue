<template>
  <h2 v-if="props.title" class="text-xl">Weather</h2>
  <div :class="classObject">
    <WeatherRow
      v-for="station in Object.keys(weather).sort((a, b) => {
        if (!sort) return 0;

        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })"
      :key="station"
      :station="station"
      :weather="weather[station]"
      :wind="props.wind"
      :temperature="props.temperature"
      :dewpoint="props.dewpoint"
      :altimeter="props.altimeter"
      :visibility="props.visibility"
      :clouds="props.clouds"
      :precipitation="props.precipitation"
      :rules="props.rules"
      :class="{
        'pr-4 border-r border-neutral-300 dark:border-neutral-700 last:border-r-0 last:pr-0': !props.table,
        'border-b border-neutral-300 dark:border-neutral-700 py-2': props.table,
      }"
    />
  </div>
  <div v-if="Object.keys(weather).length === 0" class="text-center">No weather data available</div>
  <div v-if="props.showUpdated" class="pt-4 text-xs">Updated: {{ lastUpdated.toLocaleTimeString() }}</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, Ref, ref } from "vue";
import Weather from "@/utils/weather";
import WeatherRow from "./WeatherRow.vue";

type WeatherType = {
  station: string;
  wind: string;
  temperature: string;
  dewpoint: string;
  altimeter: string;
  visibility: string;
  clouds: string;
  precipitation: string;
  rules: string;
};

interface Props {
  stations: string[];
  wind?: boolean;
  temperature?: boolean;
  dewpoint?: boolean;
  altimeter?: boolean;
  visibility?: boolean;
  clouds?: boolean;
  precipitation?: boolean;
  rules?: boolean;
  showUpdated?: boolean;
  sort?: boolean;
  title?: boolean;
  table?: boolean;
  gridSize?: string;
}

const weather: Ref<{ [key: string]: WeatherType }> = ref({});
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
const props = withDefaults(defineProps<Props>(), {
  wind: false,
  temperature: false,
  dewpoint: false,
  altimeter: false,
  visibility: false,
  clouds: false,
  precipitation: false,
  rules: false,
  showUpdated: false,
  sort: false,
  title: false,
  table: false,
  gridSize: "5",
});
const cols = ref(1);
const lastUpdated = ref(new Date());

const classObject = computed(() => {
  const gridClasses = `grid grid-cols-${props.gridSize} gap-x-4 gap-y-2`;

  const classes: { [key: string]: boolean } = {};
  classes[gridClasses] = !props.table;

  return classes;
});

const calculateCols = (): void => {
  cols.value = 1;
  if (props.wind) {
    cols.value += 1;
  }
  if (props.temperature) {
    cols.value += 1;
  }
  if (props.dewpoint) {
    cols.value += 1;
  }
  if (props.altimeter) {
    cols.value += 1;
  }
  if (props.visibility) {
    cols.value += 1;
  }
  if (props.clouds) {
    cols.value += 1;
  }
  if (props.precipitation) {
    cols.value += 1;
  }
  if (props.rules) {
    cols.value += 1;
  }
};

calculateCols();

const updateWeather = (): void => {
  props.stations.forEach((station) => {
    Weather.getMetars(station).then((raw) => {
      const metar = Weather.parseMetar(raw);
      const w: WeatherType = {
        station: metar.icao as string,
        wind: "",
        clouds: "",
        temperature: `${metar.temperature?.celsius}`,
        dewpoint: `${metar.dewpoint?.celsius}`,
        altimeter: `A${metar.barometer?.mb}`,
        visibility: `${metar.visibility?.miles} nm`,
        precipitation: metar.conditions.join(" "),
        rules: (metar.flight_category as string).toLowerCase(),
      };
      if ((metar.wind?.speed_kts as number) < 3) {
        w.wind = "Calm";
      } else {
        w.wind = `${metar.wind?.degrees.toString().padStart(3, "0")}/${metar.wind?.speed_kts}${
          metar.wind?.gust_kts && (metar.wind?.speed_kts as number) + 10 <= metar.wind?.gust_kts
            ? `G${metar.wind?.gust_kts}`
            : ""
        }kt`;
      }
      metar.clouds?.forEach((c) => {
        w.clouds += `${c.code} ${c.base_feet_agl}`;
      });
      weather.value[station] = w;
    });
  });
  lastUpdated.value = new Date();
};

onMounted(() => {
  updateWeather();

  refreshTimer = setInterval(() => {
    updateWeather();
  }, 120000);
});

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style scoped></style>
