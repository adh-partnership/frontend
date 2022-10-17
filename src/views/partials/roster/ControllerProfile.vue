<template>
  <h2 class="text-3xl">General</h2>
  <p class="mb-0"><strong>Rating:</strong> {{ controller.rating }}</p>
  <p class="mb-0">
    <strong>Type:</strong> <span class="capitalize">{{ controller.controller_type }}</span>
  </p>
  <p v-if="controller.controller_type === 'visitor'" class="mb-0">
    <strong>Visiting From:</strong>
    {{ `${controller.region} ${controller.division} ${controller.subdivision}` }}
  </p>

  <p class="mb-0">
    <strong>Status:</strong> <span class="capitalize">{{ controller.status }}</span>
  </p>

  <p class="mb-0">
    <strong>Discord ID:</strong>
    <span class="capitalize"> {{ controller.discord_id !== "NULL" ? controller.discord_id : " Not Connected" }} </span>
  </p>
  <h2 class="text-3xl mt-4">Certifications</h2>
  <div class="flex items-center mb-4">
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="ground-cert"> Ground </label>
    </div>
    <div class="w-1/5">
      <select
        id="ground-cert"
        v-model="certs.ground"
        data-position="ground"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="major-ground-cert">
        Major Ground
      </label>
    </div>
    <div class="w-1/5">
      <select
        id="major-ground-cert"
        v-model="certs.major_ground"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
  </div>
  <div class="flex items-center mb-4">
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="local-cert"> Local </label>
    </div>
    <div class="w-1/5">
      <select
        id="local-cert"
        v-model="certs.local"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="major-local-cert">
        Major Local
      </label>
    </div>
    <div class="w-1/5">
      <select
        id="major-local-cert"
        v-model="certs.major_local"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
  </div>
  <div class="flex items-center mb-4">
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="approach-cert">
        Approach
      </label>
    </div>
    <div class="w-1/5">
      <select
        id="approach-cert"
        v-model="certs.approach"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="major-approach-cert">
        Major Approach
      </label>
    </div>
    <div class="w-1/5">
      <select
        id="major-approach-cert"
        v-model="certs.major_approach"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
  </div>
  <div class="flex items-center mb-4">
    <div class="w-1/5">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="enroute-cert"> Enroute </label>
    </div>
    <div class="w-1/5">
      <select
        id="enroute-cert"
        v-model="certs.enroute"
        class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div v-if="hasRole(['atm', 'datm', 'ta', 'wm', 'ins'])" class="w-3/5 text-center">
      <button
        v-if="buttonState === ButtonStates.Idle"
        class="btn bg-colorado-blue text-white font-bold py-2 px-4 rounded"
        @click="save"
      >
        Save
      </button>
      <button
        v-if="buttonState === ButtonStates.Saving"
        class="btn bg-colorado-yellow text-black font-bold py-2 px-4 rounded"
      >
        Saving
      </button>
      <button v-if="buttonState === ButtonStates.Saved" class="btn bg-green text-white font-bold py-2 px-4 rounded">
        Saved
      </button>
      <button v-if="buttonState === ButtonStates.Error" class="btn bg-red text-white font-bold py-2 px-4 rounded">
        Error... try again later or contact the webmaster
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";

import type { Controller } from "@/types";
import { hasRole } from "@/utils/auth";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/axios";

let saveTimer: ReturnType<typeof setTimeout>;

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Saved = 2,
  Error = 3,
}
const buttonState = ref(ButtonStates.Idle);

const props = withDefaults(
  defineProps<{
    controller: Controller;
  }>(),
  {}
);

const certs = { ...props.controller.certifications }; // Dereference
const store = useRosterStore();

const save = async (): Promise<void> => {
  buttonState.value = ButtonStates.Saving;
  try {
    const result = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      certifications: certs,
    });
    if (result.status === 200) {
      buttonState.value = ButtonStates.Saved;
      saveTimer = setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
      }, 4000);
      store.updateController(props.controller.cid, {
        ...props.controller,
        certifications: certs,
      });
    } else {
      buttonState.value = ButtonStates.Error;
      saveTimer = setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
      }, 4000);
    }
  } catch (error) {
    buttonState.value = ButtonStates.Error;
    saveTimer = setTimeout(() => {
      buttonState.value = ButtonStates.Idle;
    }, 15000);
  }
};

onUnmounted(() => {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
});
</script>

<style scoped>
.bg-green {
  background-color: #003717;
}
.bg-red {
  background-color: #c01907;
}
</style>
