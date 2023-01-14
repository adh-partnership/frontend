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
        <div class="w-1/2">{{ user.position }}</div>
        <div class="w-1/4 text-center">{{ user.controller.operating_initials || "??" }}</div>
        <div class="w-1/4 text-center">{{ convertTime(user.online_since) }}</div>
      </div>
    </div>
    <div class="flex flex-1 mt-4">Last Refreshed: {{ refreshedAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from "vue";
import { convertTime } from "@/utils/helpers";
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
</script>

<style scoped></style>
