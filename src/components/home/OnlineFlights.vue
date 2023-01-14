<template>
  <div>
    <h2 class="text-xl">Flights</h2>
    <div v-if="overflights === null || overflights.length === 0" class="flex flex-1">
      <i>No flights in the airspace currently.</i>
    </div>
    <div v-else>
      <div class="flex border-b-1">
        <div :class="{ 'w-2/5': props.showType, 'w-3/5': !props.showType }">Callsign</div>
        <div v-if="props.showType" class="w-1/5 text-center invisible sm:visible">Type</div>
        <div class="w-1/5 text-center">Dep.</div>
        <div class="w-1/5 text-center">Arr.</div>
      </div>
      <!-- Sort by callsign -->
      <div
        v-for="flight in overflights.sort((a, b) => (a.callsign > b.callsign ? 1 : -1))"
        :key="flight.cid"
        class="flex items-center"
      >
        <div :class="{ 'w-2/5': props.showType, 'w-3/5': !props.showType }">{{ flight.callsign }}</div>
        <div v-if="props.showType" class="w-1/5 text-center invisible sm:visible">
          {{ flight.type !== "" ? flight.type : "??" }}
        </div>
        <div class="w-1/5 text-center">
          {{ flight.dep !== "" ? flight.dep : "??" }}
        </div>
        <div class="w-1/5 text-center">
          {{ flight.arr !== "" ? flight.arr : "??" }}
        </div>
      </div>
    </div>
    <div class="flex flex-1 mt-4">Last Refreshed: {{ refreshedAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, Ref } from "vue";
import fac from "@/facility";
import { Overflight } from "@/types";
import { ZDVAPI } from "@/utils/api";

const props = defineProps<{
  showType?: boolean;
}>();

const overflights: Ref<Overflight[]> = ref([]);
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
const refreshedAt: Ref<Date | string> = ref("never");

const updateData = (): void => {
  ZDVAPI.get(`/v1/overflight/${fac.faa_id}`).then((r) => {
    overflights.value = r.data;
  });

  refreshedAt.value = new Date().toLocaleTimeString();
};

onMounted(async () => {
  updateData();

  refreshTimer = setInterval(updateData, 2 * 60 * 1000);
});

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style scoped></style>
