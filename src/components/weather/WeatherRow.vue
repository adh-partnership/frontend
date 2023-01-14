<template>
  <div :class="`grid grid-cols-${cols} gap-4`">
    <div>{{ props.weather.station }}</div>
    <div v-if="props.wind">{{ props.weather.wind }}</div>
    <div v-if="props.temperature">{{ props.weather.temperature }}</div>
    <div v-if="props.dewpoint">{{ props.weather.dewpoint }}</div>
    <div v-if="props.altimeter">{{ props.weather.altimeter }}</div>
    <div v-if="props.visibility">{{ props.weather.visibility }}</div>
    <div v-if="props.clouds">{{ props.weather.clouds }}</div>
    <div v-if="props.precipitation">{{ props.weather.precipitation }}</div>
    <div v-if="props.rules" class="text-right">
      <WeatherBadge :flight-category="props.weather.rules" slim />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WeatherBadge from "./WeatherBadge.vue";

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
  station: string;
  weather: WeatherType;
  wind?: boolean;
  temperature?: boolean;
  dewpoint?: boolean;
  altimeter?: boolean;
  visibility?: boolean;
  clouds?: boolean;
  precipitation?: boolean;
  rules?: boolean;
}

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
});
const cols = ref(1);

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
</script>

<style scoped></style>
