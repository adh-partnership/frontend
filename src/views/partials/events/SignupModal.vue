<template>
  <button type="button" class="btn bg-emerald-500 text-white font-bold py-2 px-4 ml-2 rounded" @click="toggleModal()">
    <i class="fas fa-user-plus mr-2"></i>Sign up
  </button>

  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70">
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-1/3">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Sign Up</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="toggleModal()"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <form>
          <div class="relative z-0 mb-6 w-full group">
            <select
              id="choice1"
              v-model="signup.choice1"
              class="block px-2.5 pb-2.5 pt-4 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
            >
              <option v-for="position in props.positions" :key="position.id" class="dark:bg-black-deep">
                {{ position.position }}
              </option>
            </select>
            <label
              for="choice1"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Choice 1</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <select
              id="choice2"
              v-model="signup.choice2"
              class="block px-2.5 pb-2.5 pt-4 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
            >
              <option v-for="position in props.positions" :key="position.id" class="dark:bg-black-deep">
                {{ position.position }}
              </option>
            </select>
            <label
              for="choice2"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Choice 2</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <select
              id="choice3"
              v-model="signup.choice3"
              class="block px-2.5 pb-2.5 pt-4 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
            >
              <option v-for="position in props.positions" :key="position.id" class="dark:bg-black-deep">
                {{ position.position }}
              </option>
            </select>
            <label
              for="choice3"
              class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Choice 3</label
            >
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="createSignup()"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { EventPosition, EventSignup } from "@/types";
import { isAuthenticated } from "@/utils/auth";
import { ref } from "vue";
import useEventStore from "@/stores/event";
import { ZDVAPI } from "@/utils/api";

const eventStore = useEventStore();
const isOpen = ref(false);
const signup = ref({} as EventSignup);

type Props = {
  id: number;
  positions: EventPosition[];
};
const props = defineProps<Props>();

const toggleModal = (): void => {
  isOpen.value = !isOpen.value;
  window.scrollTo(0, 0);
};

const canSignup = (): boolean => {
  return isAuthenticated();
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

const buttonState = ref(ButtonStates.Idle);

const createSignup = async (): Promise<void> => {
  if (canSignup()) {
    try {
      const result = await ZDVAPI.post(`/v1/events/${props.id}/signup`, {
        choice1: signup.value.choice1,
        choice2: signup.value.choice2,
        choice3: signup.value.choice3,
        notes: "",
      });
      if (result.status === 200) {
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
    } catch (error) {
      buttonState.value = ButtonStates.Error;
    }
  }
};
</script>

<style scoped></style>
