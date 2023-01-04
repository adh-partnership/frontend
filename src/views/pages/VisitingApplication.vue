<template>
  <div>
    <h1 class="text-2xl">Visiting Application</h1>
    <div v-if="userStore.user === null">
      <p class="pb-2">To access the visiting application, please first login with VATSIM.</p>
      <a
        class="btn py-4 px-4 bg-colorado-blue hover:bg-blue-900"
        :href="`${apiUrl}/v1/user/login?redirect=${loc}`"
        type="button"
      >
        <i class="fa fa-user" /> Login with VATSIM
      </a>
    </div>
    <div v-else-if="!skipControllerTypeCheck && userStore.user?.controller_type !== 'none' && !isAdmin()">
      You are not eligible to apply for visiting status as you are already on the Roster of this facility.
    </div>
    <div v-else-if="!isAdmin()">
      <p>
        Thank you for your interest in joining the {{ fac.name }} facility as a visiting controller. Please keep in mind
        the following requirements must be met before applying, or your application will be rejected.
      </p>
      <p>Requirements:</p>
      <ul class="list-disc ml-4 mb-4">
        <li>You must be a member of VATSIM and have a rating no less than {{ fac.minVisitorRating }}.</li>
        <li>At least 90 days must have elapsed since your last rating change.</li>
        <li>You must not already be a member of this facility.</li>
        <li>
          Other requirements in accordance with the VATSIM Transfer and Visiting Controller Policy and applicable
          division and facility policies.
        </li>
      </ul>
      <p>
        If you meet the above and wish to apply as a visiting controller, please click the button below. After doing so,
        you will receive an email with the outcome of your application after it has been reviewed. Please allow up to 7
        days to review your application before contacting staff.
      </p>
      <div v-if="!applying && !error">
        <button class="btn bg-colorado-blue hover:bg-blue-900" type="button" @click="apply">
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
              <td>{{ c.user.cid }}</td>
              <td>{{ c.user.first_name }} {{ c.user.last_name }} ({{ c.user.rating }})</td>
              <td>{{ c.user.region }} / {{ c.user.division }} / {{ c.user.subdivision }}</td>
              <td>{{ new Date(c.created_at).toLocaleDateString() }}</td>
              <td v-if="applying" class="text-center">Saving...</td>
              <td v-if="!applying">
                <button
                  class="btn bg-green-800 hover:bg-green-900 text-white mr-2"
                  type="button"
                  @click="handle('accept', c.id)"
                >
                  <i class="fa fa-check" />
                </button>
                <button class="btn bg-red-800 hover:bg-red-900 text-white" type="button" @click="handle('deny', c.id)">
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
</template>

<script setup lang="ts">
import apiUrl, { ZDVAPI } from "@/utils/api";
import { onMounted, Ref, ref } from "vue";
import Alert from "@/components/Alert.vue";
import { AxiosResponse } from "axios";
import fac from "@/facility";
import { hasRole } from "@/utils/auth";
import Spinner from "@/components/Spinner.vue";
import useUserStore from "@/stores/users";
import type { VisitorApplication } from "@/types";

const userStore = useUserStore();
const skipControllerTypeCheck = false; // This is used for testing only
const applying = ref(false);
const error = ref("");
const applications: Ref<VisitorApplication[] | null> = ref(null);

// eslint-disable-next-line no-restricted-globals
const loc = location.href;

const isAdmin = (): boolean => {
  return hasRole(["atm", "datm", "wm"]);
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

const handle = async (action: "accept" | "deny", id: number): Promise<void> => {
  try {
    applying.value = true;
    const result = await ZDVAPI.put(`/v1/user/visitor/${id}`, { action });
    if (result.status === 200) {
      applications.value = applications.value?.filter((a) => a.id !== id) as VisitorApplication[] | null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
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
  }
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
});
</script>

<style scoped></style>
