<template>
  <div>
    <h1 class="text-2xl">Feedback</h1>
    <div class="grid grid-cols-4 gap-4">
      <div class="font-bold">Controller:</div>
      <div class="col-span-3">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ZDVAPI } from "@/utils/api";
import { computed, onMounted, Ref, ref } from "vue";
import Alert from "@/components/Alert.vue";
import { AxiosResponse } from "axios";
import type { Feedback } from "@/types";
import { hasRole } from "@/utils/auth";
import Spinner from "@/components/Spinner.vue";
import { useRouter } from "vue-router";
import useRosterStore from "@/stores/roster";
import useUserStore from "@/stores/users";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
  Saved = 3,
}

const error = ref("");
const router = useRouter();
const submitButtonState: Ref<ButtonStates> = ref(ButtonStates.Idle);

const isAdmin = (): boolean => {
  return hasRole(["atm", "datm", "wm"]);
};

const handle = async (action: "approved" | "rejected", id: number): Promise<void> => {
  try {
    submitting.value = true;
    const result = await ZDVAPI.patch(`/v1/feedback/${id}`, { status: action });
    if (result.status === 204) {
      feedbacks.value = feedbacks.value?.filter((a) => a.id !== id) as Feedback[] | null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
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
    submitting.value = false;
  }
};

const goBack = (): void => {
  router.push(`/feedback`);
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
});
</script>

<style scoped></style>
