<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Non-Member Roster</h1>

    <div class="rounded-md w-full bg-white dark:bg-black-deep border-1 drop-shadow-md flex flex-col">
      <div v-if="!fetched" class="m-3">Getting roster...</div>
      <div v-else-if="fetched && error !== ''">
        <div class="m-3">Error getting roster: {{ error }}</div>
      </div>
      <div v-else>
        <div class="w-full text-right">
          Filter:
          <input
            v-model="search"
            type="text"
            class="w-3/5 lg:w-1/5 bg-white dark:bg-black-deep border border-gray-500 dark:border-gray-100 text-gray-700 dark:text-white py-2 my-2 px-4 pr-8 rounded leading-tight"
          />
        </div>
        <RosterTable :roster="filteredControllers"></RosterTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import RosterTable from "@/views/partials/roster/RosterTable.vue";
import useRosterStore from "@/stores/roster";

const fetched = ref(false);
const error = ref("");
const rosterStore = useRosterStore();
const { controllers } = storeToRefs(rosterStore);
const search = ref("");

const activeControllers = computed(() => controllers.value.filter((c) => c.controller_type === "none"));
const filteredControllers = computed(() =>
  activeControllers.value.filter((c) => {
    if (search.value === "") {
      return true;
    }

    return (
      c.cid.toString().includes(search.value) ||
      c.first_name.includes(search.value) ||
      c.last_name.includes(search.value) ||
      c.operating_initials.includes(search.value)
    );
  })
);

onMounted(() => {
  rosterStore.lastRoster = "InactiveRoster";
  if (rosterStore.hasFetched) {
    fetched.value = true;
  } else {
    rosterStore
      .fetchRoster()
      .then(() => {
        fetched.value = true;
      })
      .catch((err) => {
        error.value = err;
      });
  }
});
</script>

<style lang="scss" scoped></style>
