<template>
  <div v-if="airportInfo.arpt_id === undefined">Loading...</div>
  <div v-else class="w-full">
    <div class="grid grid-cols-4 pb-4">
      <div class="col-span-3">
        <h1 class="text-2xl pt-4 pb-0 mb-0">
          {{ toTitleCase(airportInfo.arpt_name) }} ({{ airportInfo.arpt_id }} / {{ airportInfo.icao_id }})
        </h1>
        <p class="text-md text-gray-400">{{ toTitleCase(airportInfo.city) }}, {{ airportInfo.state_code }}</p>
      </div>
      <div class="col-span-1 text-right pt-4">
        <button
          class="bg-colorado-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="router.push({ name: 'Airports' })"
        >
          Back to Airports
        </button>
      </div>
    </div>
    <table class="w-full">
      <tbody>
        <tr>
          <td class="w-1/5">Facility Type</td>
          <td class="w-4/5">{{ airportInfo.twr_type_code }}</td>
        </tr>
        <tr>
          <td class="w-1/5">Elevation</td>
          <td class="w-4/5">{{ airportInfo.elevation }} ft</td>
        </tr>
        <tr>
          <td>Latitude</td>
          <td>{{ airportInfo.latitude }}</td>
        </tr>
        <tr>
          <td>Longitude</td>
          <td>{{ airportInfo.longitude }}</td>
        </tr>
        <tr>
          <td class="w-1/5">Towered?</td>
          <td class="w-4/5">{{ airportInfo.twr_type_code !== "NON-ATCT" ? "Yes" : "No" }}</td>
        </tr>
        <tr>
          <td>Hours of Operation¹</td>
          <td>
            {{
              airportATC.twr_hrs === "24"
                ? "Continuous"
                : airportInfo.twr_type_code !== "NON-ATCT"
                  ? airportATC.twr_hrs
                  : "Not Applicable"
            }}
          </td>
        </tr>
        <tr>
          <td>Radar Facility</td>
          <td>{{ airportATC.apch_p_provider }}</td>
        </tr>
        <tr>
          <td class="pt-4">Latest METAR</td>
          <td class="pt-4">{{ airportWeather.metar === "" ? "No METAR Available" : airportWeather.metar }}</td>
        </tr>
        <tr>
          <td class="pt-4">Latest TAF</td>
          <td class="pt-4">
            <pre>{{ airportWeather.taf === "" ? "No TAF Available" : airportWeather.taf }}</pre>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="grid grid-cols-2 w-full">
      <div v-for="grp in chartGroups" :key="grp.code" class="w-full pt-4">
        <table class="w-full text-center border-separate">
          <thead>
            <tr>
              <th class="bg-colorado-blue text-white">{{ grp.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="chart in charts
                .filter((c) => c.chart_code === grp.code)
                .sort((a, b) => a.chart_name.localeCompare(b.chart_name))"
              :key="`${chart.arpt_id}-${chart.chart_url}`"
              class="hover:bg-gray-100 hover:dark:bg-zinc-800"
            >
              <td>
                <a :href="chart.chart_url" target="_blank" rel="noopener noreferrer" class="block">{{
                  chart.chart_name
                }}</a>
              </td>
            </tr>
            <tr v-if="charts.filter((c) => c.chart_code === grp.code).length === 0">
              <td>No {{ grp.name }} Charts Available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pt-4">
      ¹ Hours of Operation are local time to the airport unless "Z" is specified. This data is pulled from the FAA and
      each facility seems to submit data inconsistently.
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Airport, AirportATC, AirportCharts, AirportWeather } from "@/types";
import { onMounted, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import fac from "@/facility";
import { toTitleCase } from "@/utils/helpers";
import { ZDVAPI } from "@/utils/api";

const route = useRoute();
const router = useRouter();
const id = ref(route.params.id as string);
const airportInfo = ref({} as Airport);
const airportATC = ref({
  apch_p_provider: "Unknown",
} as AirportATC);
const charts: Ref<AirportCharts[]> = ref([]);
const airportWeather = ref({} as AirportWeather);
const chartGroups = ref([
  { name: "Departure", code: "DP" },
  { name: "Standard Terminal Arrival Procedures", code: "STAR" },
  { name: "Approach Procedures", code: "IAP" },
  { name: "Other", code: "OTHER" },
]);

onMounted(() => {
  ZDVAPI.get(`/v1/airports/${fac.faa_id}/${id.value}`)
    .then((res) => {
      airportInfo.value = res.data;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  ZDVAPI.get(`/v1/airports/${fac.faa_id}/${id.value}/atc`)
    .then((res) => {
      airportATC.value = res.data;
    })
    .catch(() => {
      // Do nothing, we can display unknown here
      // the ATC_BASE.csv file from NASR is not a fully exhaustive list
    });
  ZDVAPI.get(`/v1/airports/${fac.faa_id}/${id.value}/charts`)
    .then((res) => {
      charts.value = res.data as AirportCharts[];
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  ZDVAPI.get(`/v1/airports/${fac.faa_id}/${id.value}/weather`)
    .then((res) => {
      airportWeather.value = res.data;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
});
</script>

<style scoped></style>
