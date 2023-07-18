<template>
  <div>
    <h1 class="text-2xl">Staffing Request</h1>
    <div v-if="userStore.user === null">
      <p class="pb-2">To access the staffing request, please first login with VATSIM.</p>
      <a
        class="btn py-4 px-4 bg-colorado-blue hover:bg-blue-900"
        :href="`${apiUrl}/v1/user/login?redirect=${loc}`"
        type="button"
      >
        <i class="fa fa-user" /> Login with VATSIM
      </a>
    </div>
    <!-- <div v-else> -->
    <div>
      <div class="relative flex flex-col min-w-0 break-words light:bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div class="grid grid-cols-3 gap-x-10">
              <div class="col-span-3 md:col-span-1">
                <!-- TODO -->
              </div>
              <div class="col-span-3 md:col-span-2">
                <textarea
                  id="description"
                  v-model="form.comments"
                  rows="7"
                  class="block rounded-md p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Comments..."
                ></textarea>
              </div>
            </div>
            <div v-if="submitButtonState === ButtonStates.Idle">
              <button class="btn bg-colorado-blue hover:bg-blue-900 mt-2 md:mt-0" type="button" @click="submit">
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
                <p>There was an error submitting your feedback. Error message: {{ error }}</p>
                <p>If you believe this is an error, please contact the facility staff for guidance.</p>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import apiUrl from "@/utils/api";
import useUserStore from "@/stores/users";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const userStore = useUserStore();
const submitting = ref(false);
const error = ref("");
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);

const form = ref({
  date: "",
  start: "",
  end: "",
  departureAirport: "",
  arrivalAirport: "",
  pilots: 0,
  comments: "",
});

// eslint-disable-next-line no-restricted-globals
const loc = location.href;

const submit = async (): Promise<void> => {
  // TODO
};
</script>
