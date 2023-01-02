<template>
  <div>
    <h2 class="text-3xl">Roles</h2>
    <div class="flex">
      <div v-for="role in roles.sort()" :key="role" class="badge bg-black-deep text-white">
        {{ role }}
        <button
          v-if="canRole(role) && removalState == ButtonStates.Idle"
          class="btn btn-sm ml-4 bg-colorado-red text-white"
          @click="deleteRole(role)"
        >
          <i class="fa fa-trash"></i>
        </button>
        <button v-if="removalState == ButtonStates.Saving" class="btn btn-sm ml-4 bg-blue-800" disabled>
          <i class="fa fa-spinner fa-spin"></i>
        </button>
        <button v-if="removalState == ButtonStates.Saved" class="btn btn-sm ml-4 bg-green-800" disabled>
          <i class="fa fa-check"></i>
        </button>
        <button v-if="removalState == ButtonStates.Error" class="btn btn-sm ml-4 bg-red-800" disabled>
          <i class="fa fa-exclamation-triangle"></i> Error
        </button>
      </div>
    </div>
    <div class="flex items-center mt-4">
      <div class="w-1/2 md:w-1/5">
        <label class="block dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4" for="role"> Add Role: </label>
      </div>
      <div class="w-full md:w-1/5">
        <select
          id="addRole"
          v-model="newRole"
          class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
        >
          <option v-for="r in rolesList()" :key="r.role" :value="r.role">{{ r.name }}</option>
        </select>
      </div>
      <div class="w-1/5 ml-4">
        <button v-if="buttonState == ButtonStates.Idle" class="btn" @click="addRole">
          <i class="fa fa-plus"></i>
        </button>
        <button v-if="buttonState == ButtonStates.Saving" class="btn bg-blue-800" disabled>
          <i class="fa fa-spinner fa-spin"></i>
        </button>
        <button v-if="buttonState == ButtonStates.Saved" class="btn bg-green-800" disabled>
          <i class="fa fa-check"></i>
        </button>
        <button v-if="buttonState == ButtonStates.Error" class="btn bg-red-800" disabled>
          <i class="fa fa-exclamation-triangle"></i> Error
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/types";
import fac from "@/facility";
import { hasRole } from "@/utils/auth";
import { ref } from "vue";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/api";

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Saved = 2,
  Error = 3,
}

const buttonState = ref(ButtonStates.Idle);
const removalState = ref(ButtonStates.Idle);
const newRole = ref("");
const store = useRosterStore();

const props = defineProps<{
  controller: Controller;
}>();
const roles = ref(props.controller.roles);

const canRole = (role: string): boolean => {
  const r = fac.roles.filter((ro) => ro.role === role)[0];

  if (!r) return false;

  return hasRole(r.canGrant);
};

const rolesList = (): { name: string; role: string }[] => {
  const r = fac.roles;
  const ret: { name: string; role: string }[] = [];

  r.forEach((role) => {
    if (hasRole(role.canGrant) && !props.controller.roles.includes(role.role)) {
      ret.push({
        name: role.name,
        role: role.role,
      });
    }
  });

  return ret;
};

const addRole = (): void => {
  if (newRole.value === "") {
    buttonState.value = ButtonStates.Error;
    document.getElementById("addRole")?.focus();
    setTimeout(() => {
      buttonState.value = ButtonStates.Idle;
    }, 2000);
  }

  if (!canRole(newRole.value)) return;

  buttonState.value = ButtonStates.Saving;
  ZDVAPI.put(`/v1/user/${props.controller.cid}/roles/${newRole.value.toLowerCase()}`)
    .then(() => {
      roles.value.push(newRole.value.toLowerCase());

      store.updateController(props.controller.cid, {
        ...props.controller,
        roles: roles.value,
      });

      buttonState.value = ButtonStates.Saved;
      setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
      }, 2000);
    })
    .catch(() => {
      buttonState.value = ButtonStates.Error;
    })
    .finally(() => {
      newRole.value = "";
    });
};

const deleteRole = (role: string): void => {
  removalState.value = ButtonStates.Saving;
  ZDVAPI.delete(`/v1/user/${props.controller.cid}/roles/${role}`)
    .then(() => {
      roles.value = roles.value.filter((r) => r !== role);

      store.updateController(props.controller.cid, {
        ...props.controller,
        roles: roles.value,
      });

      removalState.value = ButtonStates.Saved;
      setTimeout(() => {
        removalState.value = ButtonStates.Idle;
      }, 1000);
    })
    .catch(() => {
      removalState.value = ButtonStates.Error;
    });
};
</script>

<style scoped></style>
