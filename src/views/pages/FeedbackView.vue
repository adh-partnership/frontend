<template>
  <div>
    <h1 class="text-2xl">Feedback</h1>
    <div v-if="feedback === null">
      <Spinner class="fill-colorado-blue dark:fill-colorado-yellow mr-10" large /><br />Loading Feedback
    </div>
    <div v-else class="grid grid-cols-4 gap-4">
      <div class="font-bold">Controller:</div>
      <div class="col-span-3">
        {{ feedback.controller.first_name }} {{ feedback.controller.last_name }} ({{ feedback.controller.cid }}/{{
          feedback.controller.rating
        }})
      </div>
      <div class="font-bold">Position:</div>
      <div>{{ feedback.position }}</div>
      <div class="font-bold">Rating:</div>
      <div class="capitalize">{{ feedback.rating }}</div>
      <div class="font-bold">Submitter:</div>
      <div>
        {{ feedback.submitter.first_name }} {{ feedback.submitter.last_name }} ({{ feedback.submitter.cid }}/{{
          feedback.submitter.rating
        }})
      </div>
      <div class="font-bold">Contact Email:</div>
      <div>{{ feedback.contact_email }}</div>
      <div class="font-bold col-span-4">Comments:</div>
      <div class="col-span-4">
        <textarea
          id="description"
          v-model="form.comments"
          rows="7"
          class="block rounded-md p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comments..."
        ></textarea>
      </div>
      <div class="font-bold align-middle">Status:</div>
      <div class="col-span-3">
        <select
          v-model="form.status"
          class="block rounded-md p-2.5 w-full text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-black-light dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved (Discord praise)</option>
          <option value="approved_silent">Approved (Silent)</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div v-if="submitButtonState === ButtonStates.Idle">
        <button class="btn bg-colorado-blue hover:bg-blue-900 mt-2 md:mt-0" type="button" @click="handle()">
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
      <div class="col-span-3 text-right">
        <button class="btn bg-red-800 hover:bg-red-900 text-white mt-2 md:mt-0" type="button" @click="goBack()">
          <i class="fa fa-arrow-left" /> Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onMounted, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";
import type { Feedback } from "@/types";
import Spinner from "@/components/Spinner.vue";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const form = ref({
  comments: "",
  status: "pending",
});

const userStore = useUserStore();

const isAdmin = (): boolean => {
  return isAuthenticated() && hasRole(userStore.getPermissionGroups?.admin);
};

const error = ref("");
const router = useRouter();
const route = useRoute();
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);
const feedback: Ref<Feedback | null> = ref(null);

const goBack = (): void => {
  router.push("/feedback#tab3");
};

const handle = async (): Promise<void> => {
  if (feedback.value === null) return;
  try {
    submitButtonState.value = ButtonStates.Saving;
    await ZDVAPI.patch(`/v1/feedback/${feedback.value.id}`, {
      comments: form.value.comments,
      status: form.value.status,
    });
    submitButtonState.value = ButtonStates.Saved;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    submitButtonState.value = ButtonStates.Error;
    switch (e.response.status) {
      case 403:
        error.value = "The feedback you are trying to action returned forbidden.";
        break;
      case 404:
        error.value = "The feedback you are trying to action does not exist.";
        break;
      case 500:
      default:
        error.value = "There was an error processing your feedback.";
        break;
    }
  } finally {
    setInterval(() => {
      submitButtonState.value = ButtonStates.Idle;
      error.value = "";
    }, 6000);
  }
};

onMounted(async (): Promise<void> => {
  const id = route.params.id;

  if (id === undefined || id === "0" || id === "") {
    router.push({ name: "NotFound" });
    return;
  }

  if (isAdmin()) {
    try {
      const result = await ZDVAPI.get(`/v1/feedback/${id}`);
      if (result.status === 200) {
        if (result.data === null) {
          router.push({ name: "NotFound" });
        } else {
          feedback.value = result.data;
          form.value.comments = (feedback.value as Feedback).comments;
        }
      }
    } catch (e) {
      router.push({ name: "ErrorCrash" });
    }
  } else {
    router.push({ name: "ErrorForbidden" });
  }
});
</script>

<style scoped></style>
