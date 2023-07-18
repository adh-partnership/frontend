<template>
  <h2 class="text-xl text-center">
    Top Controllers for {{ months[new Date().getMonth()] }}, {{ new Date().getFullYear() }}
  </h2>
  <div class="grid lg:grid-cols-3 gap-4">
    <div v-if="stats[0] === undefined" class="flex flex-col items-center col-span-3 italic">
      There are no stats available or the data is loading...
    </div>
    <div v-if="stats[0] !== undefined" class="flex flex-col items-center lg:border-r-1">
      <div class="text-xl"><i class="fa-solid fa-trophy text-alaska-gold"></i> {{ stats[0].name }}</div>
      <div class="text-lg">{{ stats[0].time }}</div>
    </div>
    <div v-if="stats[1] !== undefined" class="flex flex-col items-center lg:border-r-1">
      <div class="text-xl"><i class="fa-solid fa-trophy text-zinc-500"></i> {{ stats[1].name }}</div>
      <div class="text-lg">{{ stats[1].time }}</div>
    </div>
    <div v-if="stats[2] !== undefined" class="flex flex-col items-center">
      <div class="text-xl"><i class="fa-solid fa-trophy text-amber-700"></i> {{ stats[2].name }}</div>
      <div class="text-lg">{{ stats[2].time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { months, toTitleCase } from "@/utils/helpers";
import { onBeforeUnmount, onMounted, ref, Ref } from "vue";
import { ControllerStats } from "@/types";
import { ZDVAPI } from "@/utils/api";

const stats: Ref<{ name: string; time: string }[]> = ref([]);
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

const getHours = (controller: ControllerStats | undefined): string => {
  if (!controller) return "";

  const secs = controller.cab + controller.terminal + controller.enroute;
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);

  if (hours === 0 && minutes === 0) return "";

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
};

const updateData = (): void => {
  ZDVAPI.get("/v1/stats/historical").then((r) => {
    if (r.data.length === 0) {
      stats.value = [];
    } else {
      // We need to sort the data by enroute+terminal+cab time
      // and limit to 3 to store in stats
      const sorted: ControllerStats[] = r.data.sort((a: ControllerStats, b: ControllerStats) => {
        return b.cab + b.terminal + b.enroute - (a.cab + a.terminal + a.enroute);
      });
      for (let i = 0; i < 3; i += 1) {
        stats.value.push({
          name: toTitleCase(`${sorted[i].first_name} ${sorted[i].last_name}`),
          time: getHours(sorted[i]),
        });
      }
    }
  });
};

onMounted(async () => {
  updateData();

  refreshTimer = setInterval(updateData, 2 * 60 * 1000);
});

onBeforeUnmount(() => {
  if (refreshTimer) clearInterval(refreshTimer);
});
</script>

<style scoped></style>
