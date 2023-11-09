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
    <span class="capitalize"> {{ controller.discord_id !== "" ? controller.discord_id : " Not Connected" }} </span>
    <span v-if="controller.discord_id !== '' && hasRole(['atm', 'datm', 'wm'])">
      <button
        v-if="discordButtonState === ButtonStates.Idle"
        class="btn bg-colorado-red text-white font-bold py-2 px-4 rounded"
        @click="clearDiscord"
      >
        <i class="fa fa-trash-alt"></i>
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
    <div
      v-for="(value, certification) in sortedCertifications(controller.certifications)"
      :key="certification"
      class="flex items-center"
    >
      <label
        class="w-1/3 block text-gray-500 dark:text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
        for="ground-cert"
      >
        {{ value.display_name }}
        <span v-if="value.hidden"><i class="fa-solid fa-ghost pl-2"></i></span>
      </label>
      <span v-if="!canWorkController()" class="capitalize">{{ value.value }}</span>
      <select
        v-else
        :id="`cert-${certification}`"
        v-model="certs[certification].value"
        data-position="ground"
        class="block w-2/3 bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
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

import type { Controller, CertificationItem } from "@/types";
import { primaryBackground } from "@/utils/colors";
import useRosterStore from "@/stores/roster";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

let saveTimer: ReturnType<typeof setTimeout>;

const userStore = useUserStore();

const canWorkController = (): boolean => {
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.admin) || hasRole(userStore.getPermissionGroups?.training))
  );
};

const canModifycerts = (): boolean => {
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.admin) || hasRole(userStore.getPermissionGroups?.training))
  );
};

// Sort by certification item's order property
function sortedCertifications(certs: { [key: string]: CertificationItem }): { [key: string]: CertificationItem } {
  return Object.fromEntries(Object.entries(certs).sort(([, a], [, b]) => a.order - b.order));
}

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

const clearDiscord = async (): Promise<void> => {
  try {
    discordButtonState.value = ButtonStates.Saving;
    const result = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      discord_id: "-1",
    });
    if (result.status === 200) {
      discordButtonState.value = ButtonStates.Saved;
      setTimeout(() => {
        discordButtonState.value = ButtonStates.Idle;
      }, 4000);
      store.updateController(props.controller.cid, {
        ...props.controller,
        discord_id: "",
      });
    } else {
      discordButtonState.value = ButtonStates.Error;
      setTimeout(() => {
        discordButtonState.value = ButtonStates.Idle;
      }, 4000);
    }
  } catch {
    discordButtonState.value = ButtonStates.Error;
    setTimeout(() => {
      discordButtonState.value = ButtonStates.Idle;
    }, 15000);
  }
};

const save = async (): Promise<void> => {
  const certifications: { [key: string]: { value: string } } = {};
  Object.keys(certs.value).forEach((key) => {
    certifications[key] = { value: certs.value[key].value };
  });

  buttonState.value = ButtonStates.Saving;
  try {
    const result = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      certifications,
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
