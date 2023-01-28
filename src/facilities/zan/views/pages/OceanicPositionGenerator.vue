<template>
  <h2 class="text-xl">Position Report Generator</h2>
  <p>
    Use this to generate a position report to pass over voice or text. Only use this if not ADS-C equipped or asked for
    a position.
  </p>

  <div class="grid grid-cols-4 gap-x-10">
    <div class="relative z-0 mb-4 w-full group col-span-1">
      <input
        id="callsign"
        v-model="callsign"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="callsign"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Callsign:</label
      >
    </div>
    <div class="col-span-3"></div>
    <div class="relative z-0 mb-4 w-full group col-span-1">
      <input
        id="position"
        v-model="position"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="position"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Position:</label
      >
    </div>
    <div class="relative z-0 mb-4 w-full group">
      <input
        id="positionAt"
        v-model="positionAt"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="positionAt"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >At:</label
      >
    </div>
    <div class="relative z-0 mb-4 w-full group">
      <input
        id="altitude"
        v-model="altitude"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="altitude"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Flight Level:</label
      >
    </div>
    <div class="relative z-0 mb-4 w-full group">
      <input
        id="speed"
        v-model="speed"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="speed"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Mach:</label
      >
    </div>
    <div class="relative z-0 mb-4 w-full group col-span-1">
      <input
        id="nextFix"
        v-model="nextFix"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="nextFix"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Next Fix:</label
      >
    </div>
    <div class="relative z-0 mb-4 w-full group">
      <input
        id="nextFixAt"
        v-model="nextFixAt"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="nextFixAt"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >At:</label
      >
    </div>
    <div class="col-span-2"></div>
    <div class="relative z-0 mb-4 w-full group col-span-1">
      <input
        id="fixAfterNextFix"
        v-model="fixAfterNextFix"
        class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
      />
      <label
        for="fixAfterNextFix"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >Next Fix:</label
      >
    </div>
  </div>

  <div class="mt-4">
    <h2 class="text-xl">Position Report</h2>
    <p>{{ positionReport }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const callsign = ref("");
const position = ref("");
const positionAt = ref("");
const altitude = ref("");
const speed = ref("");
const nextFix = ref("");
const nextFixAt = ref("");
const fixAfterNextFix = ref("");

const positionReport = computed(() => {
  return `Anchorage Radio, ${callsign.value || "unknown"}, position ${position.value || "unknown"} at ${
    positionAt.value || "unknown"
  }, flight level ${altitude.value || "unknown"},
  mach ${speed.value || "unknown"}, estimating ${nextFix.value || "unknown"} at ${nextFixAt.value || "unknown"}, ${
    fixAfterNextFix.value || "unknown"
  } next.`;
});
</script>
