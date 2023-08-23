<template>
  <h1 class="text-2xl">Training Scheduler</h1>

  <div v-if="loading">
    <p class="text-normal text-gray-800 dark:text-gray-200">Loading ...</p>
  </div>
  <div v-if="!loading" class="flex justify-between pt-3">
    <div class="flex-none">
      <DatePicker
        ref="calendar"
        v-model="calendarDate"
        mode="date"
        timezone="UTC"
        :is24hr="true"
        is-required
        :is-dark="isDark"
        :min-date="minimumDate"
        :attributes="calendarAttributes"
      />
    </div>
    <div class="flex-auto pl-10">
      <h2>
        Sessions on <span class="text-blue-800 dark:text-blue-200">{{ dateSimple }}</span>
      </h2>
      <p v-show="sessionsCurrentDate.length === 0" class="text-normal text-red-800 dark:text-red-300">
        There are no available sessions on this date.
      </p>
      <p v-show="sessionsCurrentDate.length > 0">Sessions found (TODO)</p>
      <button
        v-if="canBeTrainer()"
        class="btn mt-10 bg-colorado-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        type="button"
        @click="openCreateModal"
      >
        Create new session
      </button>
    </div>
  </div>

  <div
    v-show="createModal.open"
    class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70 z-50"
  >
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/2">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Create new session</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="createModal.open = false"
        >
          <i class="fas fa-xmark w-4"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <form>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-10 mb-6 w-full group">
              <input
                id="session-position"
                v-model="createModal.position"
                type="text"
                class="block px-2.5 pb-2.5 pt-4 w-full rounded-md text-lg text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
              <label
                for="session-position"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3/7 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >Position</label
              >
            </div>
            <div class="relative z-10 mb-6 w-full group">
              <DatePicker v-model="createModal.start" mode="time" timezone="UTC" is24hr :is-dark="isDark" />
            </div>
          </div>
        </form>
      </div>
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="createNewSession"
        >
          <span v-if="createModal.buttonState === ButtonStates.Idle">Create</span>
          <span v-else-if="createModal.buttonState === ButtonStates.Saving">Saving</span>
          <span v-else-if="createModal.buttonState === ButtonStates.Error">Error!</span>
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="createModal.open = false"
        >
          Cancel
        </button>
      </div>
      <alert v-if="error != null" type="error">
        <b>Error</b>: There was an error creating the session, recheck your form values and try again. {{ error }}
      </alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import useUserStore from "@/stores/users";
import { hasRole, isAuthenticated } from "@/utils/auth";
import { DatePicker } from "v-calendar";
import { useDark } from "@vueuse/core";
import { ZDVAPI } from "@/utils/api";
import { AttributeConfig } from "v-calendar/dist/types/src/utils/attribute";
import Alert from "@/components/Alert.vue";

type Session = {
  id: number;
  controller: Record<string, unknown>;
  controller_id: number;
  duration: string;
  instructor: Record<string, unknown>;
  instructor_id: number;
  position: string;
  session_date: string;
  type: string;
  updated_at: string;
  created_at: string;
};

enum ButtonStates {
  Idle = 0,
  Saving = 1,
  Error = 2,
}

type CreateModalState = {
  open: boolean;
  start: Date | null;
  position: string;
  buttonState: ButtonStates;
};

const userStore = useUserStore();
const isDark = useDark();

const loading = ref(true);
const calendar: Ref<typeof DatePicker | null> = ref(null);
const calendarDate = ref(new Date());
const sessions: Ref<Session[]> = ref([]);
const createModal: Ref<CreateModalState> = ref({
  open: false,
  start: null,
  position: "",
  buttonState: ButtonStates.Idle,
});
const error = ref();

const minimumDate = new Date();
minimumDate.setHours(0, 0, 0);

const canBeTrainer = (): boolean => {
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.sessions) || hasRole(userStore.getPermissionGroups?.admin))
  );
};

const canBeTrainee = (): boolean => {
  return isAuthenticated() && userStore.user?.controller_type !== "none";
};

const calendarAttributes = computed((): AttributeConfig[] => {
  // TODO Convert sessions from backend to attributes for the calendar
  // https://vcalendar.io/calendar/attributes.html
  return [];
});

const dateSimple = computed(() => {
  return calendarDate.value.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
});

const sessionsCurrentDate = computed(() => {
  return sessions.value.filter((session) => {
    const sessionDate = new Date(session.session_date);
    return (
      sessionDate.getFullYear() === calendarDate.value.getFullYear() &&
      sessionDate.getMonth() === calendarDate.value.getMonth() &&
      sessionDate.getDate() === calendarDate.value.getDate()
    );
  });
});

const retrieveAllSessions = async (): Promise<void> => {
  ZDVAPI.get("/v1/training/requests").then((r) => {
    sessions.value = r.data.filter((session: Session) => {
      return new Date(session.session_date) >= minimumDate;
    });
    loading.value = false;
  });
};

const openCreateModal = (): void => {
  const start = calendarDate.value;
  start.setHours(0);
  start.setMinutes(0);
  createModal.value = { open: true, start, position: "", buttonState: ButtonStates.Idle };
};

// TODO looks like the backend API creates sessions for the *student*,
// not for the instructor. This is backward to what ZDV wants.

const createNewSession = async (): Promise<void> => {
  if (!canBeTrainer()) {
    return;
  }
  try {
    const start = null; // TODO
    const end = null; // TODO
    const result = await ZDVAPI.post("v1/training/sessions", {
      position: createModal.value.position,
      slots: [{ start, end }],
    });
    if (result.status === 201) {
      createModal.value.buttonState = ButtonStates.Idle;
      await retrieveAllSessions();
      createModal.value.open = false;
    } else {
      createModal.value.buttonState = ButtonStates.Error;
    }
  } catch (err) {
    createModal.value.buttonState = ButtonStates.Error;
    error.value = err;
  }
};

const pickOpenSession = async (): Promise<void> => {
  //
};

onMounted(() => {
  retrieveAllSessions();
});
</script>
