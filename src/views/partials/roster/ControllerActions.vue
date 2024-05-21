<template>
  <div>
    <h2 class="text-3xl">Actions</h2>
    <div v-if="isAdmin()" class="flex items-center mb-4">
      <div class="w-full md:w-1/5">
        <label
          class="block text-gray-500 dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="controllerType"
        >
          Type
        </label>
      </div>
      <div class="w-full md:w-1/5 capitalize">
        {{ controller.controller_type }}
      </div>
      <div v-if="props.controller.controller_type !== 'none'" class="w-full md:w-1/5">
        <label
          class="block text-gray-500 dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="controllerType"
        >
          Removal Reason
        </label>
      </div>
      <div v-if="props.controller.controller_type !== 'none'" class="w-3/10">
        <input
          id="removalReason"
          v-model="form.RemovalReason"
          type="text"
          class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
        />
      </div>
      <div v-if="props.controller.controller_type !== 'none'" class="w-1/5 pl-4">
        <button
          v-if="removalButtonState === ButtonStates.Idle"
          class="bg-colorado-red hover:bg-colorado-yellow hover:text-black text-white font-bold py-2 px-4 rounded"
          @click="removeController"
        >
          Remove
        </button>
        <button
          v-if="removalButtonState === ButtonStates.Saving"
          class="bg-colorado-blue hover:bg-colorado-blue text-white font-bold py-2 px-4 rounded"
          disabled
        >
          Removing
        </button>
        <button
          v-if="removalButtonState === ButtonStates.Error"
          class="bg-colorado-blue hover:bg-colorado-blue text-white font-bold py-2 px-4 rounded"
        >
          Error
        </button>
      </div>
      <div v-if="props.controller.controller_type === 'none'" class="w-1/5">
        <button
          v-if="visitButtonState === ButtonStates.Idle"
          class="bg-colorado-yellow hover:bg-colorado-blue text-black hover:text-white font-bold py-2 px-4 rounded"
          @click="addVisitor()"
        >
          Add as Visitor
        </button>
        <button
          v-if="visitButtonState === ButtonStates.Saving"
          class="bg-colorado-blue hover:bg-colorado-blue text-white font-bold py-2 px-4 rounded"
          disabled
        >
          Adding...
        </button>
        <button
          v-if="visitButtonState === ButtonStates.Error"
          class="bg-colorado-blue hover:bg-colorado-blue text-white font-bold py-2 px-4 rounded"
        >
          Error
        </button>
      </div>
    </div>
    <div v-if="isAdmin()" class="flex items-center mb-4">
      <div class="w-1/5">
        <label
          class="block text-gray-500 dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="controllerStatus"
        >
          Status
        </label>
      </div>
      <div>
        <select
          id="controllerStatus"
          v-model="form.ControllerStatus"
          class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
          @focus="resetError()"
          @change="resetError()"
        >
          <option value="none">None</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="loa">LOA</option>
        </select>
      </div>
    </div>
    <div class="flex items-center mb-4">
      <div class="w-1/5">
        <label
          class="block text-gray-500 dark:text-gray-200 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="operatingInitials"
        >
          Operating Initials
        </label>
      </div>
      <div>
        <input
          id="operatingInitials"
          v-model="form.OperatingInitials"
          type="text"
          max-size="2"
          class="block w-full bg-white dark:bg-black-deep border disabled:border-0 disabled:dark:bg-black-light disabled:bg-white border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
          :disabled="!isAdmin()"
          @focus="resetError()"
        />
      </div>
    </div>
    <div v-if="isAdmin()" class="flex items-center mb-4">
      <div class="w-1/5">
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
          {{ saveError !== null ? saveError : "Error... try again later or contact the webmaster" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onMounted, onUnmounted, ref } from "vue";
import type { Ref } from "vue";

import type { Controller } from "@/types";
import { primaryBackground } from "@/utils/colors";
import useRosterStore from "@/stores/roster";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

let saveTimer: ReturnType<typeof setTimeout>;

const store = useRosterStore();
const userStore = useUserStore();

const form: Ref<{
  ControllerType: string;
  ControllerStatus: string;
  OperatingInitials: string;
  RemovalReason: string;
}> = ref({
  ControllerType: "none",
  ControllerStatus: "none",
  OperatingInitials: "",
  RemovalReason: "",
});

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Saved = 2,
  Error = 3,
}
const buttonState = ref(ButtonStates.Idle);
const removalButtonState = ref(ButtonStates.Idle);
const visitButtonState = ref(ButtonStates.Idle);
const saveError: Ref<string | null> = ref(null);

const props = defineProps<{
  controller: Controller;
}>();

const matchFormToProps = (): void => {
  form.value.ControllerStatus = props.controller.status;
  form.value.ControllerType = props.controller.controller_type;
  form.value.OperatingInitials = props.controller.operating_initials;
};

onMounted(() => {
  matchFormToProps();
});

onUnmounted(() => {
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
});

let counter = 4;
let flashTimer: ReturnType<typeof setInterval>;

const focusRemoval = (): void => {
  document.getElementById("removalReason")?.focus();
  document.getElementById("removalReason")?.classList.add("border-red");
  // Flash the border red
  flashTimer = setInterval(() => {
    document.getElementById("removalReason")?.classList.toggle("border-red");
    if (counter === 0) {
      clearInterval(flashTimer);
    } else {
      counter -= 1;
    }
  }, 200);
};

const addVisitor = async (): Promise<void> => {
  // This shouldn't be possible, in theory...
  if (props.controller.controller_type !== "none") {
    // eslint-disable-next-line no-console
    console.log("Controller is not controller_type=none.");
    // eslint-disable-next-line no-console
    console.log(props.controller);
    return;
  }

  visitButtonState.value = ButtonStates.Saving;
  try {
    const response = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      controller_type: "visitor",
    });
    if (response.status === 200) {
      visitButtonState.value = ButtonStates.Saved;
      store.updateController(props.controller.cid, {
        ...props.controller,
        controller_type: "none",
      });
      saveTimer = setTimeout(() => {
        visitButtonState.value = ButtonStates.Idle;
      }, 2000);
    } else {
      visitButtonState.value = ButtonStates.Error;
    }
  } catch (error) {
    buttonState.value = ButtonStates.Error;
  }
};

const removeController = async (): Promise<void> => {
  // This shouldn't be possible, in theory...
  if (props.controller.controller_type === "none") {
    return;
  }

  if (!form.value.RemovalReason) {
    focusRemoval();
    return;
  }

  removalButtonState.value = ButtonStates.Saving;
  try {
    const response = await ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
      controller_type: "none",
      removal_reason: form.value.RemovalReason,
    });
    if (response.status === 200) {
      removalButtonState.value = ButtonStates.Saved;
      store.updateController(props.controller.cid, {
        ...props.controller,
        controller_type: "none",
      });
      saveTimer = setTimeout(() => {
        removalButtonState.value = ButtonStates.Idle;
      }, 2000);
    } else {
      removalButtonState.value = ButtonStates.Error;
    }
  } catch (error) {
    buttonState.value = ButtonStates.Error;
  }
};

const resetError = (): void => {
  saveError.value = null;
  clearTimeout(saveTimer);
  buttonState.value = ButtonStates.Idle;
};

const save = async (): Promise<void> => {
  if (props.controller.controller_type !== form.value.ControllerType && props.controller.controller_type !== "none") {
    if (!form.value.RemovalReason) {
      return;
    }
  }

  buttonState.value = ButtonStates.Saving;
  saveError.value = null;
  ZDVAPI.patch(`/v1/user/${props.controller.cid}`, {
    controller_type: form.value.ControllerType,
    status: form.value.ControllerStatus,
    operating_initials: form.value.OperatingInitials,
  })
    .then(() => {
      buttonState.value = ButtonStates.Saved;
      saveTimer = setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
      }, 4000);
      store.updateController(props.controller.cid, {
        ...props.controller,
        controller_type: form.value.ControllerType,
        status: form.value.ControllerStatus,
        operating_initials: form.value.OperatingInitials,
      });
    })
    .catch((error) => {
      if (error.response.status === 409) {
        saveError.value = "Those initials are already in use.";
      }
      buttonState.value = ButtonStates.Error;
      matchFormToProps();
      saveTimer = setTimeout(() => {
        buttonState.value = ButtonStates.Idle;
        saveError.value = null;
      }, 15000);
    });
};

const isAdmin = (): boolean => {
  return isAuthenticated() && hasRole(userStore.getPermissionGroups?.admin);
};
</script>

<style scoped>
.border-red {
  border: 1px solid red !important;
}
</style>
