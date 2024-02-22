<template>
  <div>
    <h1 class="text-2xl">Visiting Application</h1>
    <div v-if="userStore.user === null">
      <p class="pb-2">To access the visiting application, please first login with VATSIM.</p>
      <a class="btn py-4 px-4" :class="primaryHover" :href="`${apiUrl}/v1/user/login?redirect=${loc}`" type="button">
        <i class="fa fa-user" /> Login with VATSIM
      </a>
    </div>
    <div v-else-if="!skipControllerTypeCheck && userStore.user?.controller_type !== 'none' && !isAdmin()">
      You are not eligible to apply for visiting status as you are already on the Roster of this facility.
    </div>
    <div v-else-if="!isAdmin() || skipControllerTypeCheck">
      <p>
        Thank you for your interest in joining the {{ fac.name }} facility as a visiting controller. Please keep in mind
        the following requirements must be met before applying, or your application will be rejected.
      </p>
      <p>Requirements:</p>
      <ul class="list-disc ml-4 mb-4">
        <li>You must be a member of VATSIM and have a rating no less than S3.</li>
        <li>At least 90 days must have elapsed since your last rating change.</li>
        <li>You must have consolidated your current rating by controlling a minimum of 50 hours in that rating.</li>
        <li>
          Controllers from outside VATUSA must have passed the Rating Competency Exam from VATUSA.
          <a
            href="https://www.vatusa.net/help/kb#q12"
            target="_blank"
            class="text-colorado-yellow hover:text-colorado-red dark:hover:text-yellow-600 hover:underline"
            >More Information</a
          >
        </li>
        <li>You must not already be a member of this facility.</li>
        <li>
          Other requirements in accordance with the VATSIM Transfer and Visiting Controller Policy and applicable
          division and facility policies.
        </li>
      </ul>
      <p></p>
      <p>
        If you meet the above and wish to apply as a visiting controller, please click the button below. After doing so,
        you will receive an email with the outcome of your application after it has been reviewed. Please allow up to 7
        days to review your application before contacting staff.
      </p>
      <div v-if="!applying && !error && verifiedEligible === null" class="text-center">
        <Spinner class="fill-colorado-blue mx-auto" large />
        <p class="mt-4">Verifying Eligibility...</p>
      </div>
      <div
        v-else-if="!applying && !error && verifiedEligible === false"
        class="bg-red-700 bg-opacity-30 border-1 border-red-800 p-4 rounded-lg text-white text-center w-full"
      >
        <p>
          You do not meet the eligibility requirements to apply for visiting status. Please consult the requirements
          above.
        </p>
        <p>If you feel this is in error, please contact the Senior Staff.</p>
      </div>
      <div v-else-if="!applying && !error && verifiedEligible">
        <button class="btn" :class="primaryHover" type="button" @click="apply">
          <i class="fa fa-paper-plane" /> Apply
        </button>
      </div>
      <div v-else-if="applying && !error">
        <p>Submitting application...</p>
      </div>
      <div v-else-if="error">
        <p>There was an error submitting your application. This can mean one of the following:</p>
        <ul class="list-disc ml-4 mb-4">
          <li>You already have an outstanding visiting application.</li>
          <li>You do not meet the eligibility requirements as listed above.</li>
          <li>You are already a member of this facility.</li>
          <li>
            You are apart of VATUSA and assigned to the ZAE subdivision. You <b>must</b> have a home subdivision first.
          </li>
        </ul>
        <p>The error we got from the backend was: {{ error }}</p>
        <p>If you believe this is an error, please contact the facility staff for guidance.</p>
      </div>
    </div>
    <div v-else-if="isAdmin()">
      <p>Hello there admin... here are the pending visiting applications.</p>
      <div v-if="!applications" class="text-center">
        <center><Spinner class="fill-colorado-blue" large /></center>
        <p class="mt-4">Loading applications...</p>
      </div>
      <div v-else>
        <Alert v-if="error !== ''" type="error">
          <b>Error</b>: There was an error actioning the application. {{ error }}
        </Alert>
        <table class="w-full text-center">
          <thead class="border-b-1">
            <tr>
              <th>Controller ID</th>
              <th>Controller Name/Rating</th>
              <th>Home</th>
              <th>Application Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in applications" :key="i">
              <td>
                <a :href="`https://www.vatusa.net/mgt/controller/${c.user.cid}`" target="_blank">{{ c.user.cid }}</a>
              </td>
              <td>{{ c.user.first_name }} {{ c.user.last_name }} ({{ c.user.rating }})</td>
              <td>{{ c.user.region }} / {{ c.user.division }} / {{ c.user.subdivision }}</td>
              <td>{{ new Date(c.created_at).toLocaleDateString() }}</td>
              <td v-if="applying" class="text-center">Saving...</td>
              <td v-if="!applying">
                <button
                  class="btn bg-green-800 hover:bg-green-900 text-white mr-2"
                  type="button"
                  @click="handle('accept', c.id, '')"
                >
                  <i class="fa fa-check" />
                </button>
                <button
                  class="btn bg-red-800 hover:bg-red-900 text-white"
                  type="button"
                  @click="showRejectionModal(c.id)"
                >
                  <i class="fa fa-times w-[15px]" />
                </button>
              </td>
            </tr>
            <tr v-if="applications.length === 0">
              <td colspan="5">Hurray! There are no visiting applications to review.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div
    v-show="modalRejectionMessage"
    class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70"
  >
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/3">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Reject Visiting Application</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="cancelRejectApplication()"
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
              id="rejection-message"
              v-model="rejectionMessage"
              type="text"
              class="block px-2.5 pb-2.5 pt-4 w-full text-2xl font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="rejection-message"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Reject Reason</label
            >
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="rejectApplication()"
        >
          <span v-if="buttonState === ButtonStates.Idle">Reject</span>
          <span v-else-if="buttonState === ButtonStates.Saving">Saving</span>
          <span v-else-if="buttonState === ButtonStates.Error">Error!</span>
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="cancelRejectApplication()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUrl, { ZDVAPI } from "@/utils/api";
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onMounted, Ref, ref } from "vue";
import Alert from "@/components/Alert.vue";
import { AxiosResponse } from "axios";
import fac from "@/facility";
import { primaryHover } from "@/utils/colors";
import Spinner from "@/components/Spinner.vue";
import useUserStore from "@/stores/users";
import type { VisitorApplication } from "@/types";

const userStore = useUserStore();
const skipControllerTypeCheck = false; // This is used for testing only
const applying = ref(false);
const error = ref("");
const verifiedEligible: Ref<boolean | null> = ref(null);
const applications: Ref<VisitorApplication[] | null> = ref(null);

const modalRejectionMessage = ref(false);
const rejectApplicationId = ref(0);
const rejectionMessage = ref("");

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

const buttonState = ref(ButtonStates.Idle);

// eslint-disable-next-line no-restricted-globals
const loc = location.href;

const isAdmin = (): boolean => {
  return isAuthenticated() && hasRole(userStore.getPermissionGroups?.admin);
};

const apply = async (): Promise<void> => {
  let result: AxiosResponse<never, never>;
  try {
    applying.value = true;
    result = await ZDVAPI.post(`/v1/user/visitor`);
    applying.value = false;
    if (result.status === 200) {
      error.value = "";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    applying.value = false;
    switch (e.response.status) {
      case 401:
        error.value = "You are not logged in.";
        break;
      case 406:
        error.value = "You do not meet the eligibility requirements (406)";
        break;
      case 409:
        error.value = "You already have an outstanding application (409)";
        break;
      case 500:
      default:
        error.value = "There was an error processing your application (500)";
        break;
    }
  } finally {
    applying.value = false;
  }
};

const handle = async (action: "accept" | "deny", id: number, reason: string): Promise<void> => {
  try {
    buttonState.value = ButtonStates.Saving;
    applying.value = true;
    const result = await ZDVAPI.put(`/v1/user/visitor/${id}`, { action, reason });
    if (result.status === 204) {
      applications.value = applications.value?.filter((a) => a.id !== id) as VisitorApplication[] | null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    buttonState.value = ButtonStates.Error;
    switch (e.response.status) {
      case 404:
        error.value = "The application you are trying to action does not exist.";
        break;
      case 500:
      default:
        error.value = "There was an error processing your application.";
        break;
    }
  } finally {
    applying.value = false;
    setTimeout(() => {
      buttonState.value = ButtonStates.Idle;
    }, 5000);
  }
};

const showRejectionModal = (id: number): void => {
  modalRejectionMessage.value = true;
  rejectionMessage.value = "";
  rejectApplicationId.value = id;
};

const rejectApplication = (): void => {
  handle("deny", rejectApplicationId.value, rejectionMessage.value);
  modalRejectionMessage.value = false;
  rejectionMessage.value = "";
  rejectApplicationId.value = 0;
};

const cancelRejectApplication = (): void => {
  modalRejectionMessage.value = false;
  rejectionMessage.value = "";
  rejectApplicationId.value = 0;
};

onMounted(async (): Promise<void> => {
  if (isAdmin()) {
    try {
      const result = await ZDVAPI.get(`/v1/user/visitor`);
      if (result.status === 200) {
        applications.value = result.data;
      }
    } catch (e) {
      applications.value = [];
    }
  }
  try {
    const result = await ZDVAPI.get(`/v1/user/visitor/eligible`);
    if (result.status === 200) {
      verifiedEligible.value = result.data.eligible;
    }
  } catch (e) {
    verifiedEligible.value = false;
  }
});
</script>

<style scoped></style>
