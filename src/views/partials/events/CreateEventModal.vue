<template>
  <button
    class="btn flex-none mt-1 w-24 h-8 bg-emerald-500 hover:bg-emerald-800 text-white font-bold py-1 px-2 ml-2 rounded"
    type="button"
    @click="toggleModal()"
  >
    <i class="fas fa-plus mr-2"></i>Create
  </button>

  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70">
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/2">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Create Event Position</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="toggleModal()"
        >
          <i class="fas fa-xmark w-4"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <form>
          <div class="relative z-0 mb-6 w-full group">
            <input
              id="event-title"
              v-model="event.title"
              type="text"
              class="block px-2.5 pb-2.5 pt-4 w-full text-2xl font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="event-title"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Event Title</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <textarea
              id="description"
              v-model="event.description"
              rows="6"
              class="block mt-2 mb-2 p-2.5 w-full text-sm text-gray-900 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-10 mb-6 w-full group">
              <date-picker v-model="startDate" mode="dateTime" timezone="utc" is24hr :is-dark="isDark">
                <template #default="{ inputValue, inputEvents }">
                  <input
                    id="start-date"
                    class="block px-2.5 pb-2.5 pt-4 w-full rounded-md text-lg text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>

              <label
                for="start-date"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3/7 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Start Date</label
              >
            </div>
            <div class="relative z-10 mb-6 w-full group">
              <date-picker v-model="endDate" mode="dateTime" timezone="utc" is24hr :is-dark="isDark">
                <template #default="{ inputValue, inputEvents }">
                  <input
                    id="end-date"
                    class="block px-2.5 pb-2.5 pt-4 w-full rounded-md text-lg text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </template>
              </date-picker>
              <label
                for="end-date"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3/7 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >End Date</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                id="banner"
                v-model="event.banner"
                type="text"
                class="block px-2.5 pb-2.5 pt-4 w-full rounded-md text-lg text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="banner"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3/7 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Banner URL</label
              >
            </div>
            <img
              v-if="event.banner !== ''"
              class="max-w-10 h-auto mt-4 lg:mt-0"
              :src="event.banner"
              :alt="event.title"
            />
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="createEvent()"
        >
          <span v-if="buttonState === ButtonStates.Idle">Create</span>
          <span v-else-if="buttonState === ButtonStates.Saving">Saving</span>
          <span v-else-if="buttonState === ButtonStates.Error">Error!</span>
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="toggleModal()"
        >
          Cancel
        </button>
      </div>
      <alert v-if="error != null" type="error">
        <b>Error</b>: There was an error creating the event, recheck your form values and try again. {{ error }}
      </alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import Alert from "@/components/Alert.vue";
import { DatePicker } from "v-calendar";
import { Event } from "@/types";
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import useEventStore from "@/stores/event";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

const isDark = useDark();
const eventStore = useEventStore();
const isOpen = ref(false);
const event = ref({} as Event);
const error = ref();
const userStore = useUserStore();

const startDate = ref();
const endDate = ref();

const toggleModal = (): void => {
  isOpen.value = !isOpen.value;
  window.scrollTo(0, 0);
};

const canCreateEvent = (): boolean => {
  userStore.fetchPermissionGroupsIfNeeded();
  if (userStore.getPermissionGroups?.events === undefined) return false;
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.events) || hasRole(userStore.getPermissionGroups?.admin))
  );
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

const buttonState = ref(ButtonStates.Idle);

const createEvent = async (): Promise<void> => {
  if (canCreateEvent()) {
    event.value.start_date = new Date(startDate.value).toISOString();
    event.value.end_date = new Date(endDate.value).toISOString();
    try {
      const result = await ZDVAPI.post(`/v1/events`, event.value);
      if (result.status === 201) {
        buttonState.value = ButtonStates.Idle;
        eventStore
          .fetchEvents()
          .then(() => {
            isOpen.value = false;
          })
          .catch(() => {
            buttonState.value = ButtonStates.Error;
          });
      } else {
        buttonState.value = ButtonStates.Error;
      }
    } catch (err) {
      buttonState.value = ButtonStates.Error;
      error.value = err;
    }
  }
};
</script>

<style scoped></style>
