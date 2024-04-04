<template>
  <div>
    <h2 class="text-xl">Who's Online?</h2>
    <div v-if="online === null || online.length === 0" class="flex flex-1">
      <i>No one is online right now.</i>
    </div>
    <div v-else>
      <div
        v-for="user in online.sort((a, b) => (a.position > b.position ? 1 : -1))"
        :key="user.cid"
        class="flex items-center"
      >
        <div class="w-1/4">{{ user.position }}</div>
        <div class="w-2/4 text-right whitespace-nowrap">{{ user.controller.first_name + " " + user.controller.last_name.charAt(0) || "??" }}</div>
        <div class="w-1/4 text-right">{{ convertTimeHCF(user.online_since) }}</div>
      </div>
    </div>
    <div class="flex flex-1 mt-4">Last Refreshed: {{ refreshedAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { OnlineController } from "@/types";
import { ZDVAPI } from "@/utils/api";

const online: Ref<OnlineController[]> = ref([]);
const refreshedAt: Ref<Date | string> = ref("never");
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

const refresh = (): void => {
  ZDVAPI.get("/v1/stats/online").then((r) => {
    online.value = r.data;
  });

  refreshedAt.value = new Date().toLocaleTimeString();
};

onMounted(() => {
  refresh();
  refreshTimer = setInterval(refresh, 10000);
});

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});

const convertTimeHCF = (since: string): string => {
  const now = new Date();
  const then = new Date(since);
  const dur = now.getTime() - then.getTime();

  const hours = Math.floor(dur / (1000 * 60 * 60));
  const minutes = Math.floor((dur % (1000 * 60 * 60)) / (1000 * 60));
 if (minutes < 10) {
    return `${hours}:0${minutes}`;
  }
  return `${hours}:${minutes}`;
};
</script>

<style scoped></style>
