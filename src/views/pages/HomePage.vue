<template>
  <h1 class="text-2xl">Welcome to the {{ fac.name }}</h1>
  <p v-html="fac.homeIntroText"></p>
  <div class="flex">
    <div class="card w-3/4">
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
    <div class="card w-1/4 ml-4 h-min">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Event, OnlineController } from "@/types";
import { onMounted, ref, Ref } from "vue";

import fac from "@/facility";
import { useRouter } from "vue-router";
import { ZDVAPI } from "@/utils/api";

const online: Ref<OnlineController[]> = ref([]);
const event: Ref<Event | null> = ref(null);
const eventStartDate: Ref<Date | null> = ref(null);
const eventEndDate: Ref<Date | null> = ref(null);
const router = useRouter();

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

onMounted(async () => {
  ZDVAPI.get("/v1/stats/online").then((r) => {
    online.value = r.data;
  });

  ZDVAPI.get("/v1/events?limit=1").then((r) => {
    if (r.data.length === 0) {
      event.value = null;
    } else {
      event.value = r.data[0] as Event;
      eventStartDate.value = new Date(event.value.start_date);
      eventEndDate.value = new Date(event.value.end_date);
    }
  });
});
</script>

<style scoped></style>
