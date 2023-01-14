<template>
  <h1 class="text-2xl">Welcome to the Honolulu Control Facility</h1>
  <p>
    The Honolulu Control Facility covers the airspace of the State of Hawaii. We are a group of controllers on the
    VATSIM Network who are dedicated to providing a safe and efficient flow of traffic in the Hawaiian skies.
  </p>
  <div class="grid grid-cols-4 gap-4">
    <div class="card col-span-4 lg:col-span-3 h-min">
      <div v-if="event === null">
        <h2 class="text-xl">No event is currently scheduled</h2>
        <p>Check back later for more information.</p>
      </div>
      <div v-else class="cursor-pointer" @click="goTo(`/events/${event?.id || 0}`)">
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
        <OnlineControllers />
      </div>
      <div class="card mt-4"><OnlineFlights /></div>
    </div>
    <div class="card col-span-4 h-min">
      <WeatherTable :stations="['PHNL', 'PHOG', 'PHMK', 'PHTO', 'PHLI']" rules show-updated sort title grid-size="5" />
    </div>
    <div class="card col-span-4 h-min">
      <TopControllers />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { Event } from "@/types";
import OnlineControllers from "@/components/home/OnlineControllers.vue";
import OnlineFlights from "@/components/home/OnlineFlights.vue";
import TopControllers from "@/components/home/TopControllers.vue";
import { useRouter } from "vue-router";
import WeatherTable from "@/components/weather/WeatherTable.vue";
// eslint-disable-next-line import/no-cycle
import { ZDVAPI } from "@/utils/api";

const event: Ref<Event | null> = ref(null);
const eventStartDate: Ref<Date | null> = ref(null);
const eventEndDate: Ref<Date | null> = ref(null);
const router = useRouter();

const goTo = (url: string): void => {
  router.push(url);
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
});
</script>

<style scoped></style>
