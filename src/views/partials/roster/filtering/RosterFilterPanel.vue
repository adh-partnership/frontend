<template>
  <div class="p-4 dark:bg-slate-900 bg-slate-50">
    <!-- Input Box Filter -->
    <div class="flex flex-col items-start pb-3">
      <div class="flex justify-between items-center pb-3 w-full">
        <label for="search" class="text-lg font-medium text-gray-700 dark:text-white">Search</label>
        <button
          @click="clearFilters"
          class="text-sm dark:text-white text-gray-600 hover:text-gray-800 hover:underline"
          v-if="isDirty"
        >
          Clear Filters
        </button>
      </div>
      <input
        id="search"
        v-model="search"
        type="text"
        class="rounded-md border border-gray-500 dark:border-gray-100 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black-deep dark:text-white"
        placeholder="Search for a controller..."
        @input="filterAndEmit"
      />
    </div>

    <!-- Dropdown Filters -->
    <div class="flex flex-wrap space-x-4">
      <!-- Generate dropdown for each filter option -->
      <div
        v-for="(filter, filterKey) in filters"
        :key="filterKey"
        class="flex flex-col items-start space-y-1 space-x-1 mb-4 flex-grow"
      >
        <label :for="`filter_${filterKey}`" class="text-lg capitalize font-medium text-gray-700 dark:text-white">
          {{ filter.label }}
        </label>
        <select
          :id="`filter_${filterKey}`"
          v-model="filter.value"
          class="rounded-md border border-gray-500 dark:border-gray-100 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black-deep dark:text-white"
          @change="filterAndEmit"
        >
          <option value="">Select {{ filter.label }}</option>
          <option v-for="option in filter.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CertificationItem, Controller } from "@/types";
import { useSessionStorage } from "@vueuse/core";

// Props
const props = defineProps<{ roster: Controller[]; modelValue: Controller[]; certifications: CertificationItem[] }>();

const filterSessionState = useSessionStorage("roster-search", {
  search: "",
  filters: props.certifications.map((cert) => ({ label: cert.display_name, value: "" })),
} as FilterSessionState);

// Refs
const search = ref("");
const isDirty = ref(false);

// Lifecycle
onMounted(() => {
  search.value = filterSessionState.value.search;
  filters.forEach((filter, index) => {
    filter.value = filterSessionState.value.filters[index].value;
  });
  filterAndEmit();
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Filters that get dynamically rendered into Dropdowns.
const filters: Filter[] = [
  {
    label: "Rating",
    filterFunction: (controller: Controller, value: string) => controller.rating === value,
    options: ["OBS", "S1", "S2", "S3", "C1", "C2", "I1", "I2", "I3", "SUP", "ADM"],
    value: "",
  },
  {
    label: "Certification",
    filterFunction: (controller: Controller, value: string) => {
      return Object.values(controller.certifications).some(
        (cert) => cert.display_name === value && cert.value !== "none"
      );
    },
    options: props.certifications.map((cert) => cert.display_name),
    value: "",
  },
  {
    label: "Type",
    filterFunction: (controller: Controller, value: string) =>
      controller.controller_type.toLowerCase() === value.toLowerCase(),
    options: ["Home", "Visitor"],
    value: "",
  },
];

// Method to clear filters and reset session storage
function clearFilters(): void {
  search.value = ""; // Reset search
  filters.forEach((filter) => (filter.value = "")); // Reset each filter value
  filterAndEmit(); // Emit changes
  filterSessionState.value = { search: "", filters: filters }; // Update session storage
}

function filterAndEmit(): void {
  const searchFiltered = props.roster.filter((controller) => {
    return `${controller.first_name} ${controller.last_name}`.toLowerCase().includes(search.value.toLowerCase());
  });

  const dropdownFiltered = searchFiltered.filter((controller) => {
    return filters.every((filter) => {
      return filter.value === "" || filter.filterFunction(controller, filter.value);
    });
  });

  filterSessionState.value = { search: search.value, filters: filters };

  isDirty.value = search.value !== "" || filters.some((filter) => filter.value !== "");

  emit("update:modelValue", dropdownFiltered);
}

type Filter = {
  label: string;
  filterFunction: (controller: Controller, value: string) => boolean;
  options: string[];
  value: string;
};

type FilterSessionState = {
  search: string;
  filters: Filter[];
};
</script>
