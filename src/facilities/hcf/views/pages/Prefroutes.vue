<template>
  <div class="mt-10">
    <h1 class="text-3xl text-white">Honolulu Control Facility Preferred Routing</h1>
    <div class="search mt-10">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <label class="block text-sm font-medium text-white">
            From:
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              v-model="selectedFrom"
              type="text"
              class="input-box focus:ring-indigo-500 focus:border-indigo-500 pl-3 pr-4 text-black border-gray-300 rounded-md w-40 sm:w-48 h-12"
              placeholder="Departure ICAO"
            />
          </div>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-white">
            To:
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              v-model="selectedTo"
              type="text"
              class="input-box focus:ring-indigo-500 focus:border-indigo-500 pl-3 pr-4 text-black border-gray-300 rounded-md w-40 sm:w-48 h-12"
              placeholder="Arrival ICAO"
            />
          </div>
        </div>

        <button
          @click="search"
          class="button h-12 px-4 mt-6 border-2 border-white rounded-md"
          role="button"
        >
          Search
        </button>
      </div>
    </div>
    <div id="products" class="mt-5">
      <div v-if="searchResults.length === 0">
        <h1 v-show="searchExecuted" class="black-text">No result!</h1>
      </div>
      <div v-else v-for="(product, index) in searchResults" :key="index" class="product mt-5 border-2 border-gray-300 p-2 rounded-md max-w-2xl">
        <div class="params text-lg">
          <span><b>Departure:</b> {{ product.From.join(', ') }}</span><br>
          <span><b>Arrival:</b> {{ product.To.join(', ') }}</span><br>
          <span><b>Aircraft Type:</b> {{ product.Typey.join(', ') }}</span><br>
          <span><b>Route:</b> {{ product.Route }}</span><br>
          <span><b>Altitude:</b> {{ product.Altitude }}</span><br>
          <span><b>Other Restrictions:</b> {{ product.Restrictions }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteData, data } from './components/routedata.js'; 

const selectedFrom = ref('');
const selectedTo = ref('');
const searchResults = ref<RouteData[]>([]);
const searchExecuted = ref(false);

const search = () => {
  searchResults.value = data
    .filter((product) => product.From.includes(selectedFrom.value))
    .filter((product) => product.To.includes(selectedTo.value));
  searchExecuted.value = true;
};
</script>