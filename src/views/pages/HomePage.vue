<template>
  <h1 class="text-2xl">Welcome to the {{ fac.name }}</h1>
  <p v-html="fac.homeIntroText"></p>
  <div class="grid grid-cols-4 gap-4">
    <div class="card col-span-4 lg:col-span-3">
      <div v-if="event === null">
        <h2 class="text-xl">No event is currently scheduled</h2>
        <p>Check back later for more information.</p>
      </div>
      <div v-else @click="goTo(`/events/${event?.id || 0}`)">
        <h2 class="text-xl mb-0 text-alaska-gold">{{ event.title }}</h2>
        <p>
          {{
            eventStartDate?.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          }}
          at {{ eventStartDate?.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true }) }} -
          {{ eventEndDate?.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", hour12: true }) }}
        </p>
        <img :src="event.banner" class="w-full" alt="event image" />
      </div>
    </div>
    <div class="col-span-4 lg:col-span-1 h-min">
      <div class="card">
        <h2 class="text-xl">Who's Online?</h2>
        <div v-if="online === null || online.length === 0" class="flex flex-1">
          <i>No one is online right now.</i>
        </div>
        <div v-else>
          <div v-for="user in online" :key="user.cid" class="flex items-center">
            <div class="w-1/2">{{ user.position }}</div>
            <div class="w-1/4 text-center">{{ user.controller.operating_initials || "??" }}</div>
            <div class="w-1/4 text-center">{{ timeOnline(user.online_since) }}</div>
          </div>
        </div>
        <div class="flex flex-1 mt-4">Last Refreshed: {{ refreshedAt }}</div>
      </div>
      <div class="card mt-4">
        <h2 class="text-xl">Flights</h2>
        <div v-if="overflights === null || overflights.length === 0" class="flex flex-1">
          <i>No flights in the airspace currently.</i>
        </div>
        <div v-else>
          <div class="flex border-b-1">
            <div class="w-1/2">Callsign</div>
            <div class="w-1/4 text-center">Dep.</div>
            <div class="w-1/4 text-center">Arr.</div>
          </div>
          <div v-for="flight in overflights" :key="flight.cid" class="flex items-center">
            <div class="w-1/2">{{ flight.callsign }}</div>
            <div class="w-1/4 text-center">
              {{ flight.dep !== "" ? flight.dep : "??" }}
            </div>
            <div class="w-1/4 text-center">
              {{ flight.arr !== "" ? flight.arr : "??" }}
            </div>
          </div>
        </div>
        <div class="flex flex-1 mt-4">Last Refreshed: {{ refreshedAt }}</div>
      </div>
    </div>
    <div class="card col-span-4 h-min">
      <h2 class="text-xl text-center">
        Top Controllers for {{ months[new Date().getMonth()] }}, {{ new Date().getFullYear() }}
      </h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-if="stats[0] === undefined" class="flex flex-col items-center col-span-3 italic">
          There are no stats available or the data is loading...
        </div>
        <div v-if="stats[0] !== undefined" class="flex flex-col items-center border-r-1">
          <div class="text-xl">{{ stats[0].name }}</div>
          <div class="text-lg">{{ stats[0].time }}</div>
        </div>
        <div v-if="stats[1] !== undefined" class="flex flex-col items-center border-r-1">
          <div class="text-xl">{{ stats[1].name }}</div>
          <div class="text-lg">{{ stats[1].time }}</div>
        </div>
        <div v-if="stats[2] !== undefined" class="flex flex-col items-center">
          <div class="text-xl">{{ stats[2].name }}</div>
          <div class="text-lg">{{ stats[2].time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Event, OnlineController } from "@/types";
import { onMounted, onUnmounted, ref, Ref } from "vue";

import type { ControllerStats, Overflight } from "@/types";
import fac from "@/facility";
import { useRouter } from "vue-router";
import { ZDVAPI } from "@/utils/api";

const months = [
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

const online: Ref<OnlineController[]> = ref([]);
const event: Ref<Event | null> = ref(null);
const eventStartDate: Ref<Date | null> = ref(null);
const eventEndDate: Ref<Date | null> = ref(null);
const router = useRouter();
const stats: Ref<{ name: string; time: string }[]> = ref([]);
const overflights: Ref<Overflight[]> = ref([]);
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
const refreshedAt: Ref<Date | string> = ref("never");

const timeOnline = (since: string): string => {
  const now = new Date();
  const then = new Date(since);
  const dur = now.getTime() - then.getTime();

  const hours = Math.floor(dur / (1000 * 60 * 60));
  const minutes = Math.floor((dur % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes < 10) {
    return `${hours}+0${minutes}`;
  }

  return `${hours}+${minutes}`;
};

const goTo = (url: string): void => {
  router.push(url);
};

const getHours = (controller: ControllerStats | undefined): string => {
  if (!controller) return "";

  const secs = controller.cab + controller.terminal + controller.enroute;
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);

  if (hours === 0 && minutes === 0) return "";

  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
};

const updateData = (): void => {
  ZDVAPI.get("/v1/stats/online").then((r) => {
    online.value = r.data;
  });

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
          name: `${sorted[i].first_name} ${sorted[i].last_name}`,
          time: getHours(sorted[i]),
        });
      }
    }
  });

  ZDVAPI.get(`/v1/overflight/${fac.faa_id}`).then((r) => {
    overflights.value = r.data;
  });

  refreshedAt.value = new Date().toLocaleTimeString();
};

onMounted(async () => {
  ZDVAPI.get("/v1/events?limit=1").then((r) => {
    if (r.data.length === 0) {
      event.value = null;
    } else {
      event.value = r.data[0] as Event;
      eventStartDate.value = new Date(event.value.start_date);
      eventEndDate.value = new Date(event.value.end_date);
    }
  });

  updateData();

  refreshTimer = setInterval(updateData, 2 * 60 * 1000);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style scoped></style>
