<template>
  <div v-if="controller !== null && controller !== undefined">
    <ControllerHeader :controller="controller as Controller">
      <RouterLink :to="{ name: 'RosterController', hash: '#tab2', params: { cid: controller!.cid } }">
        <button class="flex-1 bg-colorado-red text-white hover:bg-dark-red font-bold py-2 px-4 rounded">Back</button>
      </RouterLink>
    </ControllerHeader>

    <div class="min-w-0 break-words light:bg-white w-full mb-6 shadow-lg rounded">
      <div class="px-4 py-5">
        <div class="flex">
          <div class="w-full">
            <h2>Training Note</h2>
          </div>
        </div>
        <div v-if="saveButtonState === ButtonStates.Error" class="flex pb-4">
          <Alert type="error">
            <b>Uh-oh!</b> We were unable to save this form. Please try again later. If this continues, please alert the
            Webmaster.
          </Alert>
        </div>
        <div class="flex items-center">
          <div class="w-1/5">
            <label class="block text-gray-500 dark:text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="position">
              Position
            </label>
          </div>
          <div class="w-1/5">
            <input
              id="position"
              v-model="form.position"
              type="text"
              class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
            />
          </div>
        </div>
        <div class="flex items-center pt-2">
          <div class="w-1/5">
            <label class="block text-gray-500 dark:text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="position">
              Session Date
            </label>
          </div>
          <div class="w-1/5">
            <input
              id="session_date"
              v-model="form.session_date"
              type="date"
              class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div class="flex items-center pt-2">
          <div class="w-1/5">
            <label class="block text-gray-500 dark:text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="duration">
              Duration
            </label>
          </div>
          <div class="w-1/5">
            <input
              id="duration"
              v-model="form.duration"
              type="string"
              class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
              placeholder="Duration (hh+mm)"
              :class="{ 'border-red-500': !durationValid }"
            />
          </div>
        </div>
        <div class="flex items-center pt-2">
          <div class="w-1/5">
            <label
              class="block text-gray-500 dark:text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="session_type"
            >
              Session Type
            </label>
          </div>
          <div class="w-1/5">
            <select
              id="session_type"
              v-model="form.type"
              class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
            >
              <option value="classroom">Classroom</option>
              <option value="live">Live</option>
              <option value="simulation">Simulation</option>
              <option value="Live OTS">Live OTS</option>
              <option value="simulation-ots">Simulation OTS</option>
              <option value="no-show">No Show</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="flex items-center pt-2">
          <div class="w-1/5">
            <label class="block text-gray-500 dark:text-white font-bold md:text-right mb-1 md:mb-0 pr-4" for="Comments">
              Comments
            </label>
          </div>
          <div class="w-4/5">
            <textarea
              id="comments"
              v-model="form.comments"
              type="text"
              rows="8"
              class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
            />
          </div>
        </div>
        <div class="flex items-center pt-2">
          <div class="w-1/5">
            <button
              v-if="saveButtonState === ButtonStates.Idle"
              class="bg-colorado-blue text-white hover:bg-dark-red font-bold py-2 px-4 rounded"
              @click="submit"
            >
              Submit
            </button>
            <button
              v-if="saveButtonState === ButtonStates.Saving"
              class="bg-colorado-blue text-white font-bold py-2 px-4 rounded"
            >
              Saving...
            </button>
            <button
              v-if="saveButtonState === ButtonStates.Saved"
              class="bg-colorado-blue text-white font-bold py-2 px-4 rounded"
            >
              Saved
            </button>
          </div>
          <div class="w-3/5 text-center">
            <button
              class="bg-colorado-yellow text-black hover:bg-yellow-400 font-bold py-2 px-4 rounded"
              @click="reset"
            >
              Clear Changes
            </button>
          </div>
          <div class="w-1/5 text-right">
            <RouterLink :to="{ name: 'RosterController', hash: '#tab2', params: { cid: controller!.cid } }">
              <button class="flex-1 bg-colorado-red text-white hover:bg-dark-red font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";
import type { Controller } from "@/types";
import ControllerHeader from "@/components/ControllerHeader.vue";
import { storeToRefs } from "pinia";
import useRosterStore from "@/stores/roster";
import useTrainingStore from "@/stores/training";
import { ZDVAPI } from "@/utils/axios";

const router = useRouter();
const route = useRoute();
const rosterStore = useRosterStore();
const trainingStore = useTrainingStore();
const tStore = storeToRefs(trainingStore);
const { form } = tStore;
const cid = parseInt(route.params.cid as string, 10);
const controller = ref(rosterStore.getController(cid));

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Saved = 2,
  Error = 3,
}
const saveButtonState = ref(ButtonStates.Idle);

onMounted(() => {
  // @TODO Don't allow direct access as there is store components we need initialized ... we should fix this later.
  setTimeout(() => {
    if (controller.value === undefined || form === null || tStore.student === null) {
      router.push({ name: "RosterController", params: { cid } });
    }
  }, 0);
});

const durationValid = computed(() => {
  const { duration } = form.value;
  if (duration.match(/^[0-9]{1,2}\+[0-9]{2}$/) || duration === "") {
    return true;
  }

  return false;
});

const reset = (): void => {
  trainingStore.resetForm();
};

const submit = async (): Promise<void> => {
  saveButtonState.value = ButtonStates.Saving;
  const data = {
    comments: form.value.comments,
    duration: form.value.duration,
    session_date: new Date(form.value.session_date).toISOString(),
    position: form.value.position,
    type: form.value.type,
  };
  try {
    if (form.value.id) {
      await ZDVAPI.put(`/v1/training/${trainingStore.student?.cid}/${form.value.id}`, data);
    } else {
      await ZDVAPI.post(`/v1/training/${trainingStore.student?.cid}`, data);
    }
    saveButtonState.value = ButtonStates.Saved;
  } catch (e) {
    saveButtonState.value = ButtonStates.Error;
  } finally {
    setTimeout(() => {
      saveButtonState.value = ButtonStates.Idle;
    }, 4000);
  }
};
</script>

<style scoped></style>
