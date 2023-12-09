<template>
  <div class="flex">
    <h1 class="text-2xl">Controller Activity</h1>
  </div>
  <div v-if="loading < 3" class="flex mt-4">Loading... {{ loading }} month(s) loaded.</div>
  <div v-else class="flex mt-4">
    <table class="w-full">
      <thead class="border-b-2 dark:border-neutral-800">
        <tr>
          <th class="text-left border-r-2 dark:border-neutral-800">Name<br />CID (Rating)</th>
          <th class="border-r-1 dark:border-neutral-800">{{ months[4] }}</th>
          <th class="border-r-1 dark:border-neutral-800">{{ months[3] }}</th>
          <th class="border-r-1 dark:border-neutral-800">{{ months[2] }}</th>
          <th class="border-r-1 dark:border-neutral-800">{{ months[1] }}</th>
          <th class="border-r-1 dark:border-neutral-800">{{ months[0] }}</th>
          <th class="border-l-2 dark:border-neutral-800">Controller Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="c in curMonth"
          :key="c.cid"
          class="hover:dark:bg-zinc-800 hover:bg-zinc-300 hover:cursor-pointer"
          @click="goToUser(c.cid)"
        >
          <td class="py-2 border-b-1 dark:border-neutral-800 border-r-2 dark:border-neutral-800">
            {{ c.first_name }} {{ c.last_name }} ({{ c.operating_initials || "none" }})<br />
            {{ c.cid }} ({{ c.rating }})
          </td>
          <td class="text-center py-2 border-b-1 border-r-1 dark:border-neutral-800">
            {{ getHours(minus4.find((c2) => c2.cid === c.cid)) }}
            <i :class="getCrown(c, minus4)" />
          </td>
          <td class="text-center py-2 border-b-1 border-r-1 dark:border-neutral-800">
            {{ getHours(minus3.find((c2) => c2.cid === c.cid)) }}
            <i :class="getCrown(c, minus3)" />
          </td>
          <td class="text-center py-2 border-b-1 border-r-1 dark:border-neutral-800">
            {{ getHours(minus2.find((c2) => c2.cid === c.cid)) }}
            <i :class="getCrown(c, minus2)" />
          </td>
          <td class="text-center py-2 border-b-1 border-r-1 dark:border-neutral-800">
            {{ getHours(minus1.find((c1) => c1.cid === c.cid)) }}
            <i :class="getCrown(c, minus1)" />
          </td>
          <td class="text-center py-2 border-b-1 dark:border-neutral-800">
            {{ getHours(c) }}
            <i :class="getCrown(c, curMonth)" />
          </td>
          <td class="text-center py-2 border-b-1 dark:border-neutral-800 border-l-2">
            {{
              getSum([
                minus4.find((c2) => c2.cid === c.cid),
                minus3.find((c2) => c2.cid === c.cid),
                minus2.find((c2) => c2.cid === c.cid),
                minus1.find((c2) => c2.cid === c.cid),
                c,
              ])
            }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="text-left py-2 border-r-2 border-t-2 dark:border-neutral-800">Total Hours</th>
          <th class="py-2 border-r-1 border-t-2 dark:border-neutral-800">{{ getSum(minus4) }}</th>
          <th class="py-2 border-r-1 border-t-2 dark:border-neutral-800">{{ getSum(minus3) }}</th>
          <th class="py-2 border-r-1 border-t-2 dark:border-neutral-800">{{ getSum(minus2) }}</th>
          <th class="py-2 border-r-1 border-t-2 dark:border-neutral-800">{{ getSum(minus1) }}</th>
          <th class="py-2 border-r-1 border-t-2 dark:border-neutral-800">{{ getSum(curMonth) }}</th>
          <th class="border-l-2 border-t-2 dark:border-neutral-800 py-2"></th>
        </tr>
      </tfoot>
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
const minus3: Ref<ControllerStats[]> = ref([]);
const minus4: Ref<ControllerStats[]> = ref([]);
const months: Ref<string[]> = ref([]);
const endpointMonths: string[] = [];
const router = useRouter();

const monthNames = [
  "",
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

const formatSecs = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0 && minutes === 0) return "";

  return `${String(hours).padStart(1, "0")}:${String(minutes).padStart(2, "0")}`;
};

const getHours = (controller: ControllerStats | undefined): string => {
  if (!controller) return "";

  const secs = controller.cab + controller.terminal + controller.enroute;

  return formatSecs(secs);
};

const getSum = (stats: (ControllerStats | undefined)[]): string => {
  if (!stats) return "";

  let sum = 0;
  stats.forEach((c) => {
    if (!c) return;
    sum += c.cab + c.terminal + c.enroute;
  });
  return formatSecs(sum);
};

const getCrown = (controller: ControllerStats | undefined, stats: ControllerStats[]): string => {
  if (!controller || !stats) return "hidden";

  // Copy stats into new array
  const sorted: ControllerStats[] = stats.slice().sort((a: ControllerStats, b: ControllerStats) => {
    return b.cab + b.terminal + b.enroute - (a.cab + a.terminal + a.enroute);
  });

  if (sorted.length === 0) return "hidden";

  if (sorted[0].cid === controller.cid) {
    return "fa-solid fa-trophy text-alaska-gold";
  } else if (sorted[1].cid === controller.cid) {
    return "fa-solid fa-trophy text-zinc-500";
  } else if (sorted[2].cid === controller.cid) {
    return "fa-solid fa-trophy text-amber-700";
  }

  return "hidden";
};

const goToUser = (cid: string | number): void => {
  router.push({ name: "RosterController", params: { cid: String(cid) } });
};

onMounted(() => {
  const today = new Date();
  for (let i = 0; i < 5; i += 1) {
    const nd = new Date();
    nd.setDate(1);
    nd.setMonth(today.getMonth() - i);
    const month = nd.getMonth() + 1;
    const year = nd.getFullYear();
    months.value.push(`${monthNames[month]} ${year}`);
    endpointMonths.push(`${year}/${month}`);
  }
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[0]}`)
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
  // Get stats for 3 months ago
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[2]}`)
    .then((res) => {
      minus2.value = res.data;
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[3]}`)
    .then((res) => {
      minus3.value = res.data;
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
  ZDVAPI.get(`/v1/stats/historical/${endpointMonths[4]}`)
    .then((res) => {
      minus4.value = res.data;
      loading.value += 1;
    })
    .catch(() => {
      router.push({ name: "ErrorCrash" });
    });
});
</script>

<style scoped></style>
