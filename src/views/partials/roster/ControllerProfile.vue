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

  <p v-if="canWorkController()" class="mb-0">
    <strong>Discord ID:</strong>
    <span class="capitalize"> {{ controller.discord_id !== "NULL" ? controller.discord_id : " Not Connected" }} </span>
    <span v-if="controller.discord_id !== 'NULL'">
      <button
        v-if="discordButtonState === ButtonStates.Idle"
        class="btn bg-colorado-red text-white font-bold py-2 px-4 rounded"
        @click="save"
      >
        <i class="fab fa-trash-alt"></i>
      </button>
      <button
        v-if="discordButtonState === ButtonStates.Saving"
        class="btn bg-colorado-yellow text-black font-bold py-2 px-4 rounded"
      >
        <i class="fas fa-spinner fa-spin"></i>
      </button>
      <button
        v-if="discordButtonState === ButtonStates.Saved"
        class="btn bg-green text-white font-bold py-2 px-4 rounded"
      >
        <i class="fas fa-check"></i>
      </button>
      <button
        v-if="discordButtonState === ButtonStates.Error"
        class="btn bg-red text-white font-bold py-2 px-4 rounded"
      >
        <i class="fas fa-times"></i>
      </button>
    </span>
  </p>

  <p v-if="controller.controller_type !== 'none'" class="mb-0">
    <strong>Joined:</strong> {{ new Date(controller.roster_join_date).toLocaleString() }}
  </p>

  <h2 class="text-3xl mt-4">Certifications</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 mx-5">
    <div class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="ground-cert"
      >
        Ground
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.ground }}</span>
      <select
        v-else
        id="ground-cert"
        v-model="certs.ground"
        data-position="ground"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('ground')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div v-if="!fac.skipMajor" class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="major-ground-cert"
      >
        Major Ground
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.major_ground }}</span>
      <select
        v-else
        id="major-ground-cert"
        v-model="certs.major_ground"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('major_ground')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="local-cert"
      >
        Local
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.local }}</span>
      <select
        v-else
        id="local-cert"
        v-model="certs.local"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('local')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div v-if="!fac.skipMajor" class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="major-local-cert"
      >
        Major Local
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.major_local }}</span>
      <select
        v-else
        id="major-local-cert"
        v-model="certs.major_local"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('major_local')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="approach-cert"
      >
        Approach
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.approach }}</span>
      <select
        v-else
        id="approach-cert"
        v-model="certs.approach"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('approach')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div v-if="!fac.skipMajor" class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="major-approach-cert"
      >
        Major Approach
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.major_approach }}</span>
      <select
        v-else
        id="major-approach-cert"
        v-model="certs.major_approach"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('major_approach')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="enroute-cert"
      >
        Enroute
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.enroute }}</span>
      <select
        v-else
        id="enroute-cert"
        v-model="certs.enroute"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('enroute')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div v-if="fac.hasOceanicCert" class="flex items-center">
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="oceanic-cert"
      >
        Oceanic
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ certs.oceanic }}</span>
      <select
        v-else
        id="oceanic-cert"
        v-model="certs.oceanic"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        @change="checkMtr('oceanic')"
      >
        <option value="none">None</option>
        <option value="training">Training</option>
        <option value="solo">Solo</option>
        <option value="certified">Certified</option>
      </select>
    </div>
    <div class="flex items-center">
      <div v-if="canModifycerts()" class="w-full text-center">
        <button
          v-if="buttonState === ButtonStates.Idle"
          class="btn text-white font-bold py-2 px-4 rounded"
          :class="primaryBackground"
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
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onUnmounted, ref } from "vue";

import type { Controller } from "@/types";
import fac from "@/facility";
import { primaryBackground } from "@/utils/colors";
import useRosterStore from "@/stores/roster";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

let saveTimer: ReturnType<typeof setTimeout>;

const userStore = useUserStore();

const canWorkController = (): boolean => {
  userStore.fetchPermissionGroupsIfNeeded();
  if (userStore.getPermissionGroups?.admin === undefined) return false;
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.admin) || hasRole(userStore.getPermissionGroups?.training))
  );
};

const canModifycerts = (): boolean => {
  userStore.fetchPermissionGroupsIfNeeded();
  if (userStore.getPermissionGroups?.admin === undefined) return false;
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.admin) || hasRole(userStore.getPermissionGroups?.training))
  );
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Saved = 2,
  Error = 3,
}
const buttonState = ref(ButtonStates.Idle);
const discordButtonState = ref(ButtonStates.Idle);

const props = withDefaults(
  defineProps<{
    controller: Controller;
  }>(),
  {}
);

const certs = ref({ ...props.controller.certifications }); // Dereference
const store = useRosterStore();

const checkMtr = (
  field: "ground" | "major_ground" | "local" | "major_local" | "approach" | "major_approach" | "enroute" | "oceanic"
): void => {
  if (hasRole(["mtr"]) && !field.startsWith("major_")) {
    if (certs.value[field] !== props.controller.certifications[field] && certs.value[field] === "certified") {
      certs.value[field] = props.controller.certifications[field];
    }
  }
};

const save = async (): Promise<void> => {
  // This is going to be complicated...
  if (hasRole(["mtr"])) {
    // MTRs can only change minor certs.value. between none, training, solo.... major up to and incl. certified

    // Check if minor ground is changing... we're just going to change it back silently
    if (certs.value.ground !== props.controller.certifications.ground && certs.value.ground === "certified") {
      certs.value.ground = props.controller.certifications.ground;
    }
    // Now minor local
    if (certs.value.local !== props.controller.certifications.local && certs.value.local === "certified") {
      certs.value.local = props.controller.certifications.local;
    }
    // Now minor approach
    if (certs.value.approach !== props.controller.certifications.approach && certs.value.approach === "certified") {
      certs.value.approach = props.controller.certifications.approach;
    }
    // Now enroute
    if (certs.value.enroute !== props.controller.certifications.enroute && certs.value.enroute === "certified") {
      certs.value.enroute = props.controller.certifications.enroute;
    }
    // Now oceanic
    if (
      fac.hasOceanicCert &&
      certs.value.oceanic !== props.controller.certifications.oceanic &&
      certs.value.oceanic === "certified"
    ) {
      certs.value.oceanic = props.controller.certifications.oceanic;
    }
  }

  buttonState.value = ButtonStates.Saving;
  try {
    const result = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      certifications: certs.value,
    });
    if (result.status === 200) {
      buttonState.value = ButtonStates.Saved;
      saveTimer = setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
      }, 4000);
      store.updateController(props.controller.cid, {
        ...props.controller,
        certifications: certs.value,
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

<style scoped></style>
