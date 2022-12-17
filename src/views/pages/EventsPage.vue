<template>
  <div class="flex mb-4">
    <h1 class="text-2xl">Events</h1>
    <create-event-modal v-if="canCreateEvent()" />
  </div>
  <div v-if="upcomingEvents.length > 0" class="grid grid-cols-2 gap-x-10">
    <EventCard
      v-for="event in upcomingEvents"
      :key="event.id"
      :event="event"
      class="cursor-pointer"
      @click="goToEvent(event.id)"
    />
  </div>
  <div v-else>
    <h2 class="text-xl">No events are currently scheduled</h2>
    <p>Check back later for more information.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { hasRole, isAuthenticated } from "@/utils/auth";
import CreateEventModal from "@/views/partials/events/CreateEventModal.vue";
import EventCard from "@/views/partials/events/EventCard.vue";
import useEventStore from "@/stores/event";
import { useRouter } from "vue-router";

const router = useRouter();

const fetched = ref(false);
const error = ref("");
const eventStore = useEventStore();

const canCreateEvent = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ec", "events", "wm"]);
};

const goToEvent = (id: number): void => {
  eventStore.fetchEvent(id).then(() => {
    router.push(`/events/${id}`);
  });
};

const upcomingEvents = computed(() => eventStore.getUpcomingEvents);

onMounted(() => {
  if (eventStore.hasFetched) {
    fetched.value = true;
  } else {
    eventStore
      .fetchEvents()
      .then(() => {
        fetched.value = true;
      })
      .catch((err) => {
        error.value = err;
      });
  }
});
</script>

<style scoped></style>
