<template>
  <div>
    <h1 class="text-2xl">Weather throughout the facility</h1>
    <p class="md:hidden mb-4">Unfortunately, the facility map is only available on desktop devices.</p>
    <div
      v-for="station in Object.keys(weather).sort()"
      :key="station"
      class="grid grid-cols-5 md:grid-cols-10 py-1 border-b-1 dark:border-neutral-600 border-neutral-400"
    >
      <div>{{ station }}</div>
      <div class="hidden md:block">
        <WeatherBadge :flight-category="(weather[station]?.flight_category as string)" slim />
      </div>
      <div class="col-span-4 md:col-span-8">{{ weather[station]?.raw_text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";

import { onMounted, onUnmounted, ref, Ref } from "vue";
import Facility from "@/facility";
import type { ParsedMetar } from "@/types";
import Weather from "@/utils/weather";
import WeatherBadge from "@/components/weather/WeatherBadge.vue";

let weatherUpdateTimer: ReturnType<typeof setInterval>;
const weather: Ref<{ [key: string]: ParsedMetar | null }> = ref({});

const updateWeather = (): void => {
  Facility.airports.forEach((airport) => {
    Weather.getMetars(airport.icao).then((metar) => {
      const w = Weather.parseMetar(metar);
      weather.value[airport.icao] = w;
    });
  });
};

onMounted(() => {
  updateWeather();

  weatherUpdateTimer = setInterval(() => {
    updateWeather();
  }, 2 * 60000); // every 2 minutes
});

onUnmounted(() => {
  clearInterval(weatherUpdateTimer);
});
</script>
