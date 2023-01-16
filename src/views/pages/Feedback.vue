<template>
  <div>
    <h1 class="text-2xl">Feedback</h1>
    <div v-if="userStore.user === null">
      <p class="pb-2">To access the feedback form, please first login with VATSIM.</p>
      <a
        class="btn py-4 px-4 bg-colorado-blue hover:bg-blue-900"
        :href="`${apiUrl}/v1/user/login?redirect=${loc}`"
        type="button"
      >
        <i class="fa fa-user" /> Login with VATSIM
      </a>
    </div>
    <div v-else class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 1,
              'text-white bg-colorado-blue': openTab === 1,
            }"
            @click="toggleTabs(1)"
          >
            Submit Feedback
          </a>
        </li>
        <li
          v-if="!skipControllerTypeCheck && userStore.user?.controller_type !== 'none'"
          class="-mb-px mr-2 last:mr-0 flex-auto text-center"
        >
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 2,
              'text-white bg-colorado-blue': openTab === 2,
            }"
            @click="toggleTabs(2)"
          >
            My Feedback
          </a>
        </li>
        <li v-if="isAdmin()" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 3,
              'text-white bg-colorado-blue': openTab === 3,
            }"
            @click="toggleTabs(3)"
          >
            Manage Feedback
          </a>
        </li>
      </ul>

      <div class="relative flex flex-col min-w-0 break-words light:bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <div class="grid grid-cols-3 gap-x-10">
                <div class="col-span-3 md:col-span-1">
                  <div class="relative z-0 mb-4 w-full group">
                    <select
                      id="controller"
                      v-model="form.controller"
                      type="text"
                      class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                    >
                      <option value="" selected>Select Controller</option>
                      <option
                        v-for="controller in rosterStore.getActiveRoster"
                        :key="controller.cid"
                        :value="controller.cid.toString()"
                      >
                        {{ controller.first_name }} {{ controller.last_name }}
                      </option>
                    </select>
                    <label
                      for="controller"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >Controller</label
                    >
                  </div>
                  <div class="relative z-0 mb-4 w-full group col-span-1">
                    <input
                      id="position"
                      v-model="form.position"
                      type="text"
                      class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                      placeholder=" "
                    />
                    <label
                      for="position"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Position
                    </label>
                  </div>
                  <div class="relative z-0 mb-4 w-full group col-span-1">
                    <select
                      id="rating"
                      v-model="form.rating"
                      type="text"
                      class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                    <label
                      for="rating"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >Rating</label
                    >
                  </div>
                  <div class="relative z-0 mb-4 w-full group col-span-1">
                    <input
                      id="callsign"
                      v-model="form.callsign"
                      type="text"
                      class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
                      placeholder=" "
                    />
                    <label
                      for="callsign"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Your Callsign
                    </label>
                  </div>
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
            <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <div v-if="!feedbacks" class="text-center">
                <center><Spinner class="fill-colorado-blue" large /></center>
                <p class="mt-4">Loading feedback...</p>
              </div>
              <div v-else>
                <table class="w-full text-center table table-fixed">
                  <thead class="border-b-1">
                    <tr>
                      <th class="w-24">Position</th>
                      <th class="w-24">Rating</th>
                      <th class="hidden md:block">Comment</th>
                      <th class="w-24">Feedback Date</th>
                      <th class="w-24 md:hidden">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="feedback in userFeedbacks"
                      :key="feedback.id"
                      class="border-b-8 border-white dark:border-black-light"
                    >
                      <td>{{ feedback.position }}</td>
                      <td>{{ feedback.rating.charAt(0).toUpperCase() + feedback.rating.slice(1) }}</td>
                      <td class="hidden md:block">{{ feedback.comments }}</td>
                      <td>{{ new Date(feedback.created_at).toLocaleDateString() }}</td>
                      <td class="md:hidden">
                        <button
                          class="btn bg-blue-800 hover:bg-blue-900 text-white"
                          type="button"
                          @click="goTo(feedback.id)"
                        >
                          <i class="fa fa-envelope-open w-[15px]" />
                        </button>
                      </td>
                    </tr>
                    <tr v-if="userFeedbacks.length === 0">
                      <td colspan="7">There is no feedback.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <p>Hello there admin... here are the feedback submissions pending action.</p>
              <div v-if="!feedbacks" class="text-center">
                <center><Spinner class="fill-colorado-blue" large /></center>
                <p class="mt-4">Loading feedback...</p>
              </div>
              <div v-else>
                <Alert v-if="error !== ''" type="error">
                  <b>Error</b>: There was an error actioning the feedback. {{ error }}
                </Alert>
                <table class="w-full text-center">
                  <thead class="border-b-1">
                    <tr>
                      <th>Controller</th>
                      <th>Position</th>
                      <th>Pilot</th>
                      <th>Rating</th>
                      <th>Feedback Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="feedback in feedbacks.filter((f) => f.status === 'pending')"
                      :key="feedback.id"
                      class="cursor-pointer"
                      @click="goTo(feedback.id)"
                    >
                      <td>
                        {{ feedback.controller.first_name }} {{ feedback.controller.last_name }} <br />
                        <span>{{ feedback.controller.cid }}</span>
                      </td>
                      <td>{{ feedback.position }}</td>
                      <td>
                        {{ feedback.submitter.first_name }} {{ feedback.submitter.last_name }} <br />
                        <span>{{ feedback.submitter.cid }}</span>
                      </td>
                      <td class="capitalize">{{ feedback.rating }}</td>
                      <td>{{ new Date(feedback.created_at).toLocaleDateString() }}</td>
                      <td v-if="feedback.status === 'approved'">Approved</td>
                      <td v-else-if="submitting" class="text-center">Saving...</td>
                      <td v-else-if="!submitting">
                        <button
                          class="btn bg-blue-800 hover:bg-blue-900 text-white"
                          type="button"
                          @click="goTo(feedback.id)"
                        >
                          <i class="fa fa-envelope-open w-[15px]" />
                        </button>
                      </td>
                    </tr>
                    <tr v-if="feedbacks.filter((f) => f.status === 'pending').length === 0">
                      <td colspan="7">There is no pending feedback.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUrl, { ZDVAPI } from "@/utils/api";
import { computed, onMounted, Ref, ref } from "vue";
import Alert from "@/components/Alert.vue";
import { AxiosResponse } from "axios";
import type { Feedback } from "@/types";
import { hasRole } from "@/utils/auth";
import Spinner from "@/components/Spinner.vue";
import useRosterStore from "@/stores/roster";
import { useRouter } from "vue-router";
import useUserStore from "@/stores/users";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const userStore = useUserStore();
const rosterStore = useRosterStore();
const skipControllerTypeCheck = false; // This is used for testing only
const submitting = ref(false);
const error = ref("");
const router = useRouter();
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);
const feedbacks: Ref<Feedback[] | null> = ref(null);
const userFeedbacks = computed(() => {
  if (feedbacks.value == null) {
    return [];
  }
  return feedbacks.value.filter((f) => f.controller.cid === userStore.user?.cid);
});

// Tab System
const openTab = ref(1);
const toggleTabs = (tab: number): void => {
  openTab.value = tab;
};

const form = ref({
  callsign: "",
  comments: "",
  controller: "",
  position: "",
  rating: "excellent",
});

// eslint-disable-next-line no-restricted-globals
const loc = location.href;

const isAdmin = (): boolean => {
  return hasRole(["atm", "datm", "wm"]);
};

const submit = async (): Promise<void> => {
  let result: AxiosResponse<never, never>;
  try {
    submitButtonState.value = ButtonStates.Saving;
    result = await ZDVAPI.post(`/v1/feedback`, form.value);
    if (result.status === 204) {
      submitButtonState.value = ButtonStates.Saved;
      setTimeout(() => {
        submitButtonState.value = ButtonStates.Idle;
      }, 6000);
      error.value = "";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    submitting.value = false;
    submitButtonState.value = ButtonStates.Error;
    switch (e.response.status) {
      case 400:
        error.value = "Bad Request, check your form values (400)";
        break;
      case 403:
        error.value = "Forbidden, are you signed in? (403)";
        break;
      case 500:
      default:
        error.value = "There was an error processing your application (500)";
        break;
    }
    setTimeout(() => {
      submitButtonState.value = ButtonStates.Idle;
    }, 6000);
  }
};

const goTo = (id: number): void => {
  router.push(`/feedback/${id}`);
};

onMounted(async (): Promise<void> => {
  await rosterStore.fetchRoster();
  if (isAdmin()) {
    try {
      let result = await ZDVAPI.get(`/v1/feedback?status=pending`);
      if (result.status === 200) {
        if (result.data === null) {
          feedbacks.value = [];
        } else {
          feedbacks.value = result.data;
        }
        result = await ZDVAPI.get(`/v1/feedback?status=approved`);
        if (result.status === 200) {
          if (result.data !== null) {
            feedbacks.value = (feedbacks.value as Feedback[]).concat(result.data);
          }
        }
      }
    } catch (e) {
      feedbacks.value = [];
    }
  } else {
    try {
      const result = await ZDVAPI.get(`/v1/feedback?cid=${userStore.user?.cid}&status=approved`);
      if (result.status === 200) {
        if (result.data === null) {
          feedbacks.value = [];
        } else {
          feedbacks.value = result.data;
        }
      }
    } catch (e) {
      feedbacks.value = [];
    }
  }

  // Allow navigation direct to tab
  const { hash } = window.location;
  if (hash && hash.startsWith("#tab")) {
    const tab = parseInt(hash.replace("#tab", ""), 10);
    if (tab) {
      openTab.value = tab;
    }
  }
});
</script>

<style scoped></style>
