<template>
  <button type="button" class="btn bg-blue-400 text-white font-bold py-2 px-4 ml-2 rounded" @click="toggleModal()">
    <i class="fas fa-plus mr-2"></i>Add Position
  </button>

  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70">
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-1/3">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Create Event</h3>
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
              v-model="position.position"
              type="text"
              class="block px-2.5 pb-2.5 pt-4 w-full text-2xl font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="event-title"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Create Position</label
            >
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="createPosition()"
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
        <b>Error</b>: There was an error creating the position, recheck your form values and try again. {{ error }}
      </alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { EventPosition } from "@/types";
import { ref } from "vue";
import useEventStore from "@/stores/event";
import { ZDVAPI } from "@/utils/api";

const eventStore = useEventStore();
const isOpen = ref(false);
const position = ref({} as EventPosition);
const error = ref();

type Props = {
  id: number;
};
const props = defineProps<Props>();

const toggleModal = (): void => {
  isOpen.value = !isOpen.value;
  window.scrollTo(0, 0);
};

const canCreatePosition = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ec", "events", "wm"]);
};

const positionValid = (): boolean => {
  if (position.value.position.length === 0) {
    error.value = "Position cannot be empty";
    return false;
  }

  let suffixMatch = false;
  ["_CTR", "_APP", "_DEP", "_TWR", "_GND", "_DEL", "_FSS"].forEach((suffix) => {
    if (position.value.position.endsWith(suffix)) {
      suffixMatch = true;
    }
  });
  if (!suffixMatch) {
    error.value =
      "Invalid position entered. Must end in one of the following: _CTR, _APP, _DEP, _TWR, _GND, _DEL, _FSS";
    return false;
  }

  return true;
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

const buttonState = ref(ButtonStates.Idle);

const createPosition = async (): Promise<void> => {
  if (canCreatePosition() && positionValid()) {
    try {
      const result = await ZDVAPI.post(`/v1/events/${props.id}/positions`, {
        cid: 0,
        position: position.value.position,
      });
      if (result.status === 200) {
        buttonState.value = ButtonStates.Idle;
        eventStore
          .fetchEvent(props.id)
          .then(() => {
            isOpen.value = false;
            position.value.position = "";
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
