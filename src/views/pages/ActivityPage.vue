<template>
  <div class="flex">
    <h1 class="text-2xl">Controller Activity</h1>
  </div>
  <div v-if="loading < 3" class="flex mt-4">Loading... {{ loading }} month(s) loaded.</div>
  <div v-else class="flex mt-4">
    <table class="w-full">
      <thead class="border-b-2 dark:border-gray-800">
        <tr>
          <th class="text-left">Name</th>
          <th>CID</th>
          <th>Rating</th>
          <th>{{ months[2] }}</th>
          <th>{{ months[1] }}</th>
          <th>{{ months[0] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in curMonth" :key="c.cid">
          <td class="py-2 border-b-1 dark:border-gray-900">
            {{ c.first_name }} {{ c.last_name }} ({{ c.operating_initials }})
          </td>
          <td class="text-center py-2 border-b-1 dark:border-gray-900">{{ c.cid }}</td>
          <td class="text-center py-2 border-b-1 dark:border-gray-900">{{ c.rating }}</td>
          <td class="text-center py-2 border-b-1 dark:border-gray-900">
            {{ getHours(minus2.find((c2) => c2.cid === c.cid)) }}
          </td>
          <td class="text-center py-2 border-b-1 dark:border-gray-900">
            {{ getHours(minus1.find((c1) => c1.cid === c.cid)) }}
          </td>
          <td class="text-center py-2 border-b-1 dark:border-gray-900">{{ getHours(c) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import type { ControllerStats } from "@/types";
import { useRouter } from "vue-router";
import { ZDVAPI } from "@/utils/api";

const loading = ref(0);
const curMonth: Ref<ControllerStats[]> = ref([]);
const minus1: Ref<ControllerStats[]> = ref([]);
const minus2: Ref<ControllerStats[]> = ref([]);
const months: Ref<string[]> = ref([]);
const endpointMonths: string[] = [];
const router = useRouter();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getHours = (controller: ControllerStats | undefined): string => {
  if (!controller) return "";

  const secs = controller.cab + controller.terminal + controller.enroute;
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);

  if (hours === 0 && minutes === 0) return "";

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
};

onMounted(() => {
  const today = new Date();
  for (let i = 0; i < 3; i += 1) {
    const month = today.getMonth() - i;
    const year = today.getFullYear();
    months.value.push(`${monthNames[month]} ${year}`);
    endpointMonths.push(`${year}/${month}`);
  }
  ZDVAPI.get("/v1/stats/historical")
    .then((res) => {
      curMonth.value = res.data.sort((a: ControllerStats, b: ControllerStats) => {
        if (a.last_name < b.last_name) return -1;
        if (a.last_name > b.last_name) return 1;
        return 0;
      });
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  // Get stats for previous month
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[1]}`)
    .then((res) => {
      minus1.value = res.data;
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  // Get stats for 2 months ago
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[2]}`)
    .then((res) => {
      minus2.value = res.data;
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
});
</script>

<style scoped></style>
