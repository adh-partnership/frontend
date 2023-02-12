<template>
  <div v-if="loading" class="flex flex-wrap">Loading ...</div>
  <div v-else class="flex flex-wrap">
    <div class="mb-5 w-full">
      <div v-if="!editing" class="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold">{{ event.title }}</h1>

          <p class="font-medium text-lg m-0">
            <span class="font-bold">Start:</span> {{ localDate(event.start_date) }} -
            {{
              new Date(event.start_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>
          <p class="font-medium text-lg">
            <span class="font-bold">End:</span> {{ localDate(event.end_date) }} -
            {{
              new Date(event.end_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </p>
          <p>{{ event.description }}</p>
          <button
            v-if="canEditEvent()"
            class="btn bg-yellow-400 text-white font-bold py-2 px-4 ml-2 rounded"
            type="button"
            @click="editEvent()"
          >
            <i class="fas fa-edit mr-2"></i>Edit
          </button>
          <create-position-modal v-if="canEditEvent()" :id="id" />
          <signup-modal v-if="canSignup() && !hasSignedUp()" :id="id" :positions="event.positions" />
          <button
            v-if="canUnassign()"
            class="btn bg-orange-400 text-white font-bold py-2 px-4 ml-2 rounded"
            type="button"
            @click="cancelSignup()"
          >
            <i class="fas fa-user-xmark mr-2"></i>Cancel Signup
          </button>
          <DeleteEventModal v-if="canDeleteEvent()" :id="id" />
          <button
            v-if="canEditEvent()"
            class="btn bg-violet-500 text-white font-bold py-2 px-4 ml-2 rounded"
            type="button"
            @click="toggleView()"
          >
            <i class="fas fa-eye mr-2"></i>View
          </button>
          <alert v-if="error != null" type="error" class="m-2">
            <b>Error</b>: There was an error deleting the event. {{ error }}
          </alert>
        </div>
        <img class="max-w-10 h-auto mt-4 lg:mt-0" :src="event.banner" :alt="event.title" />
      </div>
      <div v-else>
        <form class="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
          <div>
            <div class="relative">
              <input
                id="event-title"
                v-model="modifiedEvent.title"
                type="text"
                class="block px-2.5 pb-2.5 pt-4 w-full text-2xl font-bold text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="event-title"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Event Title</label
              >
            </div>
            <div class="flex font-medium text-lg m-0 mt-2">
              <span class="font-bold mr-2 mt-1 w-14">Start:</span>
              <div class="relative w-full">
                <date-picker v-model="modifiedEvent.start_date" mode="dateTime" timezone="utc" is24hr :is-dark="isDark">
                  <template #default="{ inputValue, inputEvents }">
                    <input
                      id="event-start_date"
                      class="block px-1 pb-1 pt-2 w-full text-sm font-bold text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </date-picker>
                <label
                  for="event-end_date"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >Start Date</label
                >
              </div>
            </div>
            <div class="flex font-medium text-lg m-0 mt-2">
              <span class="font-bold mr-2 mt-1 w-14">End:</span>
              <div class="relative w-full">
                <date-picker v-model="modifiedEvent.end_date" mode="dateTime" timezone="utc" is24hr :is-dark="isDark">
                  <template #default="{ inputValue, inputEvents }">
                    <input
                      id="event-start_date"
                      class="block px-1 pb-1 pt-2 w-full text-sm font-bold text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </date-picker>
                <label
                  for="event-end_date"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >End Date</label
                >
              </div>
            </div>
            <textarea
              id="description"
              v-model="modifiedEvent.description"
              rows="6"
              class="block mt-2 mb-2 p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
            <button
              v-if="canEditEvent()"
              class="btn bg-neutral-500 text-white font-bold py-2 px-4 ml-2 rounded"
              type="button"
              @click="editing = !editing"
            >
              <i class="fas fa-xmark mr-2"></i>Cancel
            </button>
            <button
              v-if="canEditEvent()"
              class="btn bg-emerald-500 text-white font-bold py-2 px-4 ml-2 rounded"
              type="button"
              @click="saveEvent(modifiedEvent)"
            >
              <i class="fas fa-floppy-disk mr-2"></i>
              <span v-if="buttonState === ButtonStates.Idle">Save</span>
              <span v-else-if="buttonState === ButtonStates.Saving">Saving</span>
              <span v-else-if="buttonState === ButtonStates.Error">Error!</span>
            </button>
            <alert v-if="error != null" type="error">
              <b>Error</b>: There was an error editting the event, recheck your form values and try again. {{ error }}
            </alert>
          </div>
          <div>
            <div class="relative">
              <input
                id="banner-url"
                v-model="modifiedEvent.banner"
                type="text"
                class="block px-1 pb-1 pt-2 w-full text-sm font-bold text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="banner-url"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Banner URL
              </label>
              <img class="max-w-10 h-auto mt-4 lg:mt-0" :src="modifiedEvent.banner" alt="Invalid Banner URL" />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-if="!loading && !viewSignups" class="grid grid-cols-1 lg:grid-cols-3 gap-x-5 w-full">
      <div>
        <h3 class="mb-1">Enroute Positions</h3>
        <Positions
          type="Enroute"
          :positions="event.positions"
          :signups="event.signups"
          :event-id="id"
          @update="update"
        />
      </div>
      <div>
        <h3 class="mb-1">TRACON Positions</h3>
        <Positions
          type="TRACON"
          :positions="event.positions"
          :signups="event.signups"
          :event-id="id"
          @update="update"
        />
      </div>
      <div>
        <h3 class="mb-1">Local Positions</h3>
        <Positions type="Local" :positions="event.positions" :signups="event.signups" :event-id="id" @update="update" />
      </div>
    </div>
    <div v-else-if="!loading && viewSignups" class="w-full">
      <table class="w-full text-center">
        <thead class="border-b-1">
          <tr>
            <th>Controller</th>
            <th>CID - Rating</th>
            <th>Choice 1</th>
            <th>Choice 2</th>
            <th>Choice 3</th>
            <th>Assignment</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="signup in event.signups" :key="signup.id">
            <td>{{ signup.user.first_name }} {{ signup.user.last_name }}</td>
            <td>{{ signup.user.cid }} - {{ signup.user.rating }}</td>
            <td>{{ signup.choice1 }}</td>
            <td>{{ signup.choice2 }}</td>
            <td>{{ signup.choice3 }}</td>
            <td>{{ assignment(signup.user.cid) }}</td>
            <td>{{ signup.notes }}</td>
          </tr>
          <tr v-if="event.signups.length === 0">
            <td colspan="7">There are no signups.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import CreatePositionModal from "@/views/partials/events/CreatePositionModal.vue";
import { DatePicker } from "v-calendar";
import DeleteEventModal from "@/views/partials/events/DeleteEventModal.vue";
import Positions from "@/views/partials/events/Positions.vue";
import SignupModal from "@/views/partials/events/SignupModal.vue";

import { Event } from "@/types";

import { useDark } from "@vueuse/core";
import useEventStore from "@/stores/event";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

const isDark = useDark();
const loading = ref(true);
const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const userStore = useUserStore();
const id = parseInt(route.params.id as string, 10);
const event = ref(eventStore.getEvent(id) as Event);
const modifiedEvent = ref({} as Event);
const editing = ref(false);
const error = ref();

const viewSignups = ref(false);
const toggleView = (): void => {
  viewSignups.value = !viewSignups.value;
};

const localDate = (s: string): string => {
  const dt = new Date(s);
  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
};

const canEditEvent = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ec", "events", "wm"]);
};

const canDeleteEvent = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ec", "events", "wm"]);
};

const hasSignedUp = (): boolean => {
  if (event.value.signups != null) {
    return isAuthenticated() && event.value.signups.some((s) => s.user.cid === userStore.user?.cid);
  }
  return false;
};

const canUnassign = (): boolean => {
  // Check if its within 24hrs of the event:
  const now = new Date();
  const eventDate = new Date(event.value.start_date);
  const diff = eventDate.getTime() - now.getTime();
  const diffHours = diff / (1000 * 3600);
  return diffHours > 24 && hasSignedUp();
};

const canSignup = (): boolean => {
  return isAuthenticated();
};

const assignment = (cid: number): string => {
  if (event.value.positions != null) {
    const selectedPos = event.value.positions.find((s) => s.cid === cid);
    if (selectedPos === undefined) {
      return "";
    }
    return selectedPos.position;
  }
  return "";
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

const buttonState = ref(ButtonStates.Idle);

const editEvent = (): void => {
  if (canEditEvent()) {
    buttonState.value = ButtonStates.Idle;
    modifiedEvent.value.title = event.value.title;
    modifiedEvent.value.description = event.value.description;
    modifiedEvent.value.start_date = event.value.start_date;
    modifiedEvent.value.end_date = event.value.end_date;
    modifiedEvent.value.banner = event.value.banner;
    editing.value = true;
  }
};

const cancelSignup = async (): Promise<void> => {
  if (hasSignedUp()) {
    try {
      const result = await ZDVAPI.delete(`/v1/events/${id}/signup`);
      if (result.status === 204) {
        eventStore.fetchEvent(id).then(() => {
          event.value = eventStore.getEvent(id) as Event;
        });
      }
    } catch (e) {
      error.value = e;
    }
  }
};

const saveEvent = async (e: Event): Promise<void> => {
  if (canEditEvent()) {
    buttonState.value = ButtonStates.Saving;
    try {
      const result = await ZDVAPI.patch(`/v1/events/${id}`, e);
      if (result.status === 200) {
        buttonState.value = ButtonStates.Idle;
        eventStore.updateEvent(id, e);
        event.value.title = e.title;
        event.value.description = e.description;
        event.value.start_date = e.start_date;
        event.value.end_date = e.end_date;
        event.value.banner = e.banner;
        editing.value = false;
      } else {
        buttonState.value = ButtonStates.Error;
      }
    } catch (err) {
      buttonState.value = ButtonStates.Error;
      error.value = err;
    }
  }
};

const update = (): void => {
  eventStore.fetchEvent(id).then(() => {
    event.value = eventStore.getEvent(id) as Event;
  });
};

onMounted(() => {
  if (event.value) {
    loading.value = false;
  } else {
    eventStore.fetchEvents().then(() => {
      eventStore.fetchEvent(id).then(() => {
        event.value = eventStore.getEvent(id) as Event;
        if (event.value === undefined) {
          router.push({ name: "NotFound" });
        } else {
          loading.value = false;
        }
      });
    });
  }
});
</script>

<style scoped></style>
