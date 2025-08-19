<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Roster</h1>

    <div class="rounded-md w-full bg-white dark:bg-black-deep border-1 drop-shadow-md flex flex-col">
      <div v-if="!fetched" class="m-3">Getting roster...</div>
      <div v-else-if="fetched && error !== ''">
        <div class="m-3">Error getting roster: {{ error }}</div>
      </div>
      <div v-else><RosterTable :roster="activeControllers" :certifications="certifications"></RosterTable></div>
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
const { controllers, certifications } = storeToRefs(rosterStore);

const activeControllers = computed(() => controllers.value.filter((c) => c.controller_type !== "none"));

onMounted(() => {
  rosterStore.lastRoster = "Roster";
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
