<template>
  <div>
    <h1 class="text-2xl">Airports in the Airspace</h1>
    <p>Click on an airport to view its details including general information, charts and weather!</p>
    <table class="w-full dark:bg-slate-900 bg-slate-50 cursor-pointer">
      <tbody>
        <tr
          v-for="(airport, i) in airports
            .filter((a) => !a.arpt_id.match(/\d/))
            .sort((a, b) => a.arpt_name.localeCompare(b.arpt_name))"
          :key="airport.arpt_id"
          class="hover:bg-gray-400 dark:hover:bg-gray-600"
          :class="{ 'bg-slate-100 dark:bg-slate-800 hover:bg-gray-300 hover:dark:bg-gray-600': (i - 1) % 2 }"
          @click="router.push({ name: 'AirportInfo', params: { id: airport.arpt_id } })"
        >
          <td>{{ airport.arpt_id }} / {{ airport.icao_id }}</td>
          <td>{{ toTitleCase(airport.arpt_name) }}</td>
          <td>{{ toTitleCase(airport.city) }}, {{ airport.state_code }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import type { Airport } from "@/types";
import fac from "@/facility";
import { toTitleCase } from "@/utils/helpers";
import { useRouter } from "vue-router";
import { ZDVAPI } from "@/utils/api";

const airports: Ref<Airport[]> = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const { data } = await ZDVAPI.get(`/v1/airports/${fac.faa_id}`);
    airports.value = data;
  } catch (e) {
    router.push({ name: "ErrorCrash" });
  }
});
</script>

<style scoped lang="postcss">
table tbody tr td {
  @apply p-2;
}
</style>
