<template>
  <div>
    <h1 class="text-2xl">Oceanic</h1>
    <div class="flex">
      <div class="w-1/6 mr-4 border-r border-gray-200 dark:border-gray-700">
        <ul
          id="tabs"
          class="flex flex-col -mb-px text-sm font-medium text-right"
          data-tabs-toggle="#tabContent"
          role="tablist"
        >
          <li v-for="(cat, idx) in categories" :key="idx" role="tablist">
            <button
              :id="`${cat}-tab`"
              class="inline-block p-4 rounded-l-lg text-right"
              :class="{
                'dark:text-white light:text-colorado-blue light:bg-white': openTab !== cat,
                'text-white bg-colorado-blue': openTab === cat,
              }"
              type="button"
              @click="openTab = cat"
            >
              {{ cat }}
            </button>
          </li>
        </ul>
      </div>
      <div class="w-5/6">
        <div
          v-for="(cat, idx) in categories"
          :id="cat"
          :key="idx"
          :class="{ hidden: openTab !== cat, block: openTab === cat }"
          role="tabpanel"
          :aria-labelledby="`${cat.replaceAll(' ', '-').toLowerCase()}-tab`"
        >
          <OceanicGeneral v-if="cat === 'General'" />
          <OceanicFAQ v-if="cat === 'Frequently Asked Questions'" />
          <OceanicCommunications v-if="cat === 'Communications'" />
          <OceanicPositionGenerator v-if="cat === 'Position Report Generator'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import OceanicCommunications from "./OceanicCommunications.vue";
import OceanicFAQ from "./OceanicFAQ";
import OceanicGeneral from "./OceanicGeneral.vue";
import OceanicPositionGenerator from "./OceanicPositionGenerator.vue";

const categories = ["General", "Frequently Asked Questions", "Communications", "Position Report Generator"];
const openTab = ref(categories[0]);
</script>

<style scoped></style>
