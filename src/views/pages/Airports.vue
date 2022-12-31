<template>
  <div>
    <h1 class="text-2xl">Airports in the Airspace</h1>
    <p>Click on an airport to view its details including general information, charts and weather!</p>
    <table class="w-full dark:bg-slate-900 bg-slate-50 cursor-pointer">
      <thead>
        <tr>
          <th class="bg-gray-300 dark:bg-gray-900 text-white text-right pr-2 py-2" colspan="1">&nbsp;</th>
          <th class="bg-gray-300 dark:bg-gray-900 dark:text-white text-right pr-2 py-2" colspan="1">
            <label for="searchTowered" class="pr-2 text-sm font-medium text-gray-700 dark:text-white"
              >Towered Only?</label
            >
            <input
              v-model="searchTowered"
              type="checkbox"
              class="accent-colorado-blue bg-white dark:bg-black-deep border border-gray-300 dark:border-gray-900 text-gray-700 dark:text-white focus:ring-0 focus:ring-offset-0"
            />
          </th>
          <th class="bg-gray-300 dark:bg-gray-900 text-white text-right pr-2 py-2" colspan="1">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-white">Filter:</label>
          </th>
          <th class="bg-gray-300 dark:bg-gray-900 text-white text-right pr-2 py-2">
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                v-model="search"
                type="text"
                class="block focus:ring-0 focus:ring-offset-0 w-full flex-1 rounded-none rounded-l-md sm:text-sm bg-white dark:bg-black-deep border border-gray-300 dark:border-gray-900 text-gray-700 dark:text-white"
              />
              <span
                class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 dark:bg-black-deep dark:border-gray-900 px-3 text-sm text-gray-500 dark:text-white"
                @click="search = ''"
              >
                <i class="fa fa-x"></i
              ></span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(airport, i) in filteredAirports"
          :key="airport.arpt_id"
          class="hover:bg-gray-400 dark:hover:bg-gray-600"
          :class="{ 'bg-slate-100 dark:bg-slate-800 hover:bg-gray-300 hover:dark:bg-gray-600': (i - 1) % 2 }"
          @click="router.push({ name: 'AirportInfo', params: { id: airport.arpt_id } })"
        >
          <td class="w-[1/8]">{{ airport.arpt_id }} / {{ airport.icao_id }}</td>
          <td class="w-[1/8]">
            <i v-if="airport.twr_type_code !== 'NON-ATCT'" class="fa-regular fa-tower-control"></i>
          </td>
          <td class="w-1/2">
            {{ toTitleCase(airport.arpt_name) }}
          </td>
          <td class="w-1/4">{{ toTitleCase(airport.city) }}, {{ airport.state_code }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from "vue";
import type { Airport } from "@/types";
import fac from "@/facility";
import { toTitleCase } from "@/utils/helpers";
import { useRouter } from "vue-router";
import { ZDVAPI } from "@/utils/api";

const airports: Ref<Airport[]> = ref([]);
const router = useRouter();
const search = ref("");
const searchTowered = ref(false);
const filteredAirports = computed(() => {
  return airports.value
    .filter((a) => {
      if (a.arpt_id.match(/\d/)) {
        return false;
      }

      if (search.value === "" && !searchTowered.value) {
        return true;
      }

      return (
        (a.arpt_id.includes(search.value) ||
          a.icao_id.includes(search.value) ||
          a.arpt_name.toLowerCase().includes(search.value.toLowerCase()) ||
          a.city.toLowerCase().includes(search.value.toLowerCase())) &&
        searchTowered &&
        a.twr_type_code !== "NON-ATCT"
      );
    })
    .sort((a, b) => a.arpt_name.localeCompare(b.arpt_name));
});

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
.dark [type="checkbox"]:checked {
  @apply bg-blue-900;
}
[type="checkbox"]:focus {
  @apply ring-0 border-0;
}
</style>
