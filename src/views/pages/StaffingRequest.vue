<template>
  <div>
    <h1 class="text-2xl">Staffing Request</h1>
    <div v-if="userStore.user === null">
      <p class="pb-2">To access the staffing request form, please first login with VATSIM.</p>
      <a
        class="btn py-4 px-4 bg-colorado-blue hover:bg-blue-900"
        :href="`${apiUrl}/v1/user/login?redirect=${loc}`"
        type="button"
      >
        <i class="fa fa-user" /> Login with VATSIM
      </a>
    </div>
    <div v-else>
      <div class="relative flex flex-col min-w-0 break-words light:bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="grid grid-cols-3">
            <div class="flex flex-col justify-between">
              <div class="pt-5">
                <div class="relative z-0 mb-4 w-full group col-span-1">
                  <input
                    id="departureAirport"
                    v-model="form.departureAirport"
                    type="text"
                    maxlength="4"
                    class="block uppercase px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                  />
                  <label
                    for="departureAirport"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Departure Airport
                  </label>
                </div>
                <div class="relative z-0 mb-4 w-full group col-span-1">
                  <input
                    id="arrivalAirport"
                    v-model="form.arrivalAirport"
                    type="text"
                    maxlength="4"
                    class="block uppercase px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                  />
                  <label
                    for="arrivalAirport"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Arrival Airport
                  </label>
                </div>
                <div class="relative z-0 mb-4 w-full group col-span-1">
                  <input
                    id="pilots"
                    v-model="form.pilots"
                    type="number"
                    min="1"
                    max="250"
                    class="block uppercase px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                  />
                  <label
                    for="pilots"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    (Estimated) Number of Pilots
                  </label>
                </div>
              </div>
              <div>
                <div v-if="submitButtonState === ButtonStates.Idle">
                  <button
                    class="btn mt-4 md:mt-0"
                    :class="{
                      'bg-colorado-blue hover:bg-blue-900': formValid,
                      'bg-gray-700 hover:bg-gray-500': !formValid,
                    }"
                    type="button"
                    :disabled="!formValid"
                    @click="submit"
                  >
                    <i class="fa fa-paper-plane" /> Submit
                  </button>
                </div>
                <div v-else-if="submitButtonState === ButtonStates.Saving">
                  <button class="btn bg-neutral-500 mt-2 md:mt-0" type="button" disable>
                    <i class="fa fa-save" /> Submitting...
                  </button>
                </div>
                <div v-else-if="submitButtonState === ButtonStates.Saved">
                  <button class="btn bg-green-800 mt-2 md:mt-0" type="button" disable>
                    <i class="fa fa-check" /> Submitted!
                  </button>
                </div>
                <div v-else-if="submitButtonState === ButtonStates.Error">
                  <Alert type="error">
                    <p>There was an error requesting staffing. Error message: {{ error }}</p>
                    <p>If you believe this is an error, please contact the facility staff for guidance.</p>
                  </Alert>
                </div>
              </div>
            </div>
            <div class="relative flex justify-around z-0 mb-4 w-full group col-span-1">
              <div>
                <p class="mb-0 pl-1">Start time (Zulu)</p>
                <DatePicker
                  v-model="form.date"
                  mode="dateTime"
                  timezone="UTC"
                  :is24hr="true"
                  is-required
                  :is-dark="isDark"
                />
              </div>
            </div>
            <div class="pt-5">
              <textarea
                id="description"
                v-model="form.comments"
                rows="6"
                class="block rounded-md p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Comments..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUrl, { ZDVAPI } from "@/utils/api";
import { computed, ref, Ref } from "vue";
import { DatePicker } from "v-calendar";
import { useDark } from "@vueuse/core";
import useUserStore from "@/stores/users";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const userStore = useUserStore();
const isDark = useDark();
const error = ref("");
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);
const form = ref({
  date: null,
  departureAirport: "",
  arrivalAirport: "",
  pilots: 5,
  comments: "",
});

const formValid = computed(() => {
  return form.value.date && form.value.departureAirport && form.value.arrivalAirport;
});

const loc = window.location.href;

const submit = async (): Promise<void> => {
  try {
    submitButtonState.value = ButtonStates.Saving;
    await ZDVAPI.post("/v1/staffing", {
      date: form.value.date,
      departureAirport: form.value.departureAirport,
      arrivalAirport: form.value.arrivalAirport,
      pilots: form.value.pilots,
      comments: form.value.comments,
    });
    submitButtonState.value = ButtonStates.Saved;
  } catch (e: any) {
    submitButtonState.value = ButtonStates.Error;
    switch (e.response.status) {
      case 403:
        error.value = "The staffing request you are trying to action returned forbidden.";
        break;
      case 404:
        error.value = "The staffing request you are trying to action does not exist.";
        break;
      case 500:
      default:
        error.value = "There was an error processing your staffing request.";
        break;
    }
  } finally {
    setInterval(() => {
      submitButtonState.value = ButtonStates.Idle;
      error.value = "";
    }, 6000);
  }
};
</script>
