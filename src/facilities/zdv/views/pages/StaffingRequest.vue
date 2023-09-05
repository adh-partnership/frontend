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
      <div class="pt-3">
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input
              id="departureAirport"
              v-model="form.departureAirport"
              type="text"
              maxlength="4"
              :class="inputClass + ' uppercase'"
            />
            <label for="departureAirport" :class="labelClass + ' required'"> Departure Airport </label>
          </div>
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input
              id="arrivalAirport"
              v-model="form.arrivalAirport"
              type="text"
              maxlength="4"
              :class="inputClass + ' uppercase'"
            />
            <label for="arrivalAirport" :class="labelClass + ' required'"> Arrival Airport </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input id="pilots" v-model="form.pilots" type="number" min="1" :class="inputClass" />
            <label for="pilots" :class="labelClass + ' required'"> Number of Pilots (estimated) </label>
          </div>
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input id="bannerUrl" v-model="form.bannerUrl" type="url" :class="inputClass" />
            <label for="bannerUrl" :class="labelClass"> Banner URL (if you have one) </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-20 mb-4 w-full group col-span-1">
            <DatePicker
              v-model="form.startDate"
              mode="dateTime"
              timezone="utc"
              is24hr
              :is-dark="isDark"
              :min-date="yesterday"
              :rules="{ minutes: [0, 15, 30, 45] }"
            >
              <template #default="{ inputValue, inputEvents }">
                <input id="startDate" type="text" :class="inputClass" :value="inputValue" v-on="inputEvents" />
              </template>
            </DatePicker>
            <label for="startDate" :class="labelClass + ' required'"> Start date & time </label>
          </div>
          <div class="relative z-20 mb-4 w-full group col-span-1">
            <DatePicker
              v-model="form.endDate"
              mode="dateTime"
              timezone="utc"
              is24hr
              :is-dark="isDark"
              :min-date="yesterday"
              :rules="{ minutes: [0, 15, 30, 45] }"
            >
              <template #default="{ inputValue, inputEvents }">
                <input id="endDate" type="text" :class="inputClass" :value="inputValue" v-on="inputEvents" />
              </template>
            </DatePicker>
            <label for="endDate" :class="labelClass + ' required'"> End date & time </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input id="contactInfo" v-model="form.contactInfo" type="text" :class="inputClass" />
            <label for="contactInfo" :class="labelClass + ' required'">
              Contact info (homepage, email, Discord ID, etc.)
            </label>
          </div>
          <div class="relative z-0 mb-4 w-full group col-span-1">
            <input id="organization" v-model="form.organization" type="text" :class="inputClass" />
            <label for="organization" :class="labelClass">Organization (if part of one)</label>
          </div>
        </div>
        <textarea
          id="description"
          v-model="form.comments"
          rows="6"
          class="block rounded-md p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Any additional comments"
        />
        <div id="submit" class="py-5">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUrl, { ZDVAPI } from "@/utils/api";
import { computed, ref, Ref } from "vue";
import { DatePicker } from "v-calendar";
import { isAxiosError } from "axios";
import { useDark } from "@vueuse/core";
import useUserStore from "@/stores/users";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const inputClass =
  "block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep";
const labelClass =
  "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1";

const userStore = useUserStore();
const isDark = useDark();
const error = ref("");
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);
const form = ref({
  departureAirport: "",
  arrivalAirport: "",
  pilots: null,
  startDate: null,
  endDate: null,
  bannerUrl: null,
  contactInfo: null,
  organization: null,
  comments: "",
});

const formValid = computed(() => {
  return (
    form.value.departureAirport &&
    form.value.arrivalAirport &&
    form.value.departureAirport.length >= 3 &&
    form.value.arrivalAirport.length >= 3 &&
    form.value.pilots &&
    form.value.pilots > 0 &&
    form.value.startDate &&
    form.value.endDate &&
    form.value.endDate > form.value.startDate &&
    form.value.contactInfo
  );
});

const loc = window.location.href;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const submit = async (): Promise<void> => {
  try {
    if (!formValid.value) {
      return;
    }
    submitButtonState.value = ButtonStates.Saving;
    await ZDVAPI.post("/v1/staffing", {
      departureAirport: form.value.departureAirport,
      arrivalAirport: form.value.arrivalAirport,
      startDate: (form.value.startDate ?? new Date()).toLocaleString("en-US"),
      endDate: (form.value.endDate ?? new Date()).toLocaleString("en-US"),
      pilots: form.value.pilots,
      contactInfo: form.value.contactInfo,
      organization: form.value.organization,
      bannerUrl: form.value.bannerUrl,
      comments: form.value.comments,
    });
    submitButtonState.value = ButtonStates.Saved;
  } catch (err: unknown) {
    submitButtonState.value = ButtonStates.Error;
    if (isAxiosError(err)) {
      switch (err.response?.status) {
        case 401:
        case 403:
          error.value = "The staffing request you are trying to submit returned forbidden.";
          break;
        case 500:
        default:
          error.value = "There was an error processing your staffing request.";
          break;
      }
    } else {
      error.value = "There was an error processing your staffing request.";
    }
  } finally {
    setInterval(() => {
      submitButtonState.value = ButtonStates.Idle;
      error.value = "";
    }, 6000);
  }
};
</script>

<style lang="scss" scoped>
.required:after {
  content: " *";
  color: red;
}
</style>
