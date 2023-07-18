<template>
  <div class="rounded-md break-words mb-5 p-1 shadow-sm bg-neutral-200 dark:bg-black-deep">
    <div class="flex-auto pb-2 m-0">
      <div v-if="props.type === 'Enroute'">
        <div v-for="position in enroutePositions" :key="position.id">
          <div class="grid grid-cols-8 gap-x-4 border border-0 border-b-1 border-black dark:border-white p-2">
            <p class="col-span-3 text-lg font-semibold m-0">{{ position.position }}</p>
            <p
              v-if="position.user != null"
              class="text-lg mb-0 truncate"
              :class="{ 'col-span-3': canModifyPosition(), 'col-span-5': !canModifyPosition() }"
            >
              {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
            </p>
            <p v-else class="col-span-3 mb-0">Vacant</p>
            <div v-if="canModifyPosition()" class="col-span-2 text-right">
              <button
                type="button"
                class="btn bg-yellow-400 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="assign[position.id] = !assign[position.id]"
              >
                <i class="fas fa-user"></i>
              </button>
              <div
                class="absolute z-10 mt-1 w-40 text-center bg-white rounded divide-y divide-gray-600 shadow dark:bg-black-deep dark:divide-gray-400 border border-yellow-400"
                :class="{ hidden: !assign[position.id] }"
              >
                <div class="py-1.5 text-sm text-gray-900 dark:text-white">
                  <p v-if="error != null" class="font-medium text-red-500">Error!</p>
                  <p v-else-if="position.user != null" class="font-medium">
                    {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(0, position.position);
                        position.user = null;
                      "
                    >
                      <i class="fas fa-xmark mr-2"></i>Unassign
                    </a>
                  </p>
                  <p v-else class="font-medium truncate">Vacant</p>
                </div>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li v-for="signup in signupsForPos(position.position)" :key="signup.id">
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(signup.user.cid, position.position);
                        position.user = signup.user;
                      "
                    >
                      {{ toTitleCase(`${signup.user.first_name} ${signup.user.last_name}`) }}
                    </a>
                  </li>
                  <li v-if="signupsForPos(position.position).length === 0">
                    <p class="block py-2 px-4">No Signups</p>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
                    @click="
                      toggleModal(position.position);
                      assign[position.id] = !assign[position.id];
                    "
                  >
                    <i class="fas fa-plus"></i> Manually Assign
                  </a>
                </div>
              </div>
              <button
                type="button"
                class="btn bg-red-500 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="deletePosition(position.position)"
              >
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="props.type === 'TRACON'">
        <div v-for="position in traconPositions" :key="position.id">
          <div class="grid grid-cols-8 gap-x-4 border border-0 border-b-1 border-black dark:border-white p-2">
            <p class="col-span-3 text-lg font-semibold m-0">{{ position.position }}</p>
            <p
              v-if="position.user != null"
              class="text-lg mb-0 truncate"
              :class="{ 'col-span-3': canModifyPosition(), 'col-span-5': !canModifyPosition() }"
            >
              {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
            </p>
            <p v-else class="col-span-3 mb-0">Vacant</p>
            <div v-if="canModifyPosition()" class="col-span-2 text-right">
              <button
                type="button"
                class="btn bg-yellow-400 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="assign[position.id] = !assign[position.id]"
              >
                <i class="fas fa-user"></i>
              </button>
              <div
                class="absolute z-10 mt-1 w-40 text-center bg-white rounded divide-y divide-gray-600 shadow dark:bg-black-deep dark:divide-gray-400 border border-yellow-400"
                :class="{ hidden: !assign[position.id] }"
              >
                <div class="py-1.5 text-sm text-gray-900 dark:text-white">
                  <p v-if="position.user != null" class="font-medium">
                    {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(0, position.position);
                        position.user = null;
                      "
                    >
                      <i class="fas fa-xmark mr-2"></i>Unassign
                    </a>
                  </p>
                  <p v-else class="font-medium truncate">Vacant</p>
                </div>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li v-for="signup in signupsForPos(position.position)" :key="signup.id">
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(signup.user.cid, position.position);
                        position.user = signup.user;
                      "
                    >
                      {{ toTitleCase(`${signup.user.first_name} ${signup.user.last_name}`) }}
                    </a>
                  </li>
                  <li v-if="signupsForPos(position.position).length === 0">
                    <p class="block py-2 px-4">No Signups</p>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
                    @click="
                      toggleModal(position.position);
                      assign[position.id] = !assign[position.id];
                    "
                  >
                    <i class="fas fa-plus"></i> Manually Assign
                  </a>
                </div>
              </div>
              <!--              <assign-position-modal :id="position.id" />-->
              <button
                type="button"
                class="btn bg-red-500 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="deletePosition(position.position)"
              >
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="props.type === 'Local'">
        <div v-for="position in localPositions" :key="position.id">
          <div class="grid grid-cols-8 gap-x-4 border border-0 border-b-1 border-black dark:border-white p-2">
            <p class="col-span-3 text-lg font-semibold m-0">{{ position.position }}</p>
            <p
              v-if="position.user != null"
              class="text-lg mb-0 truncate"
              :class="{ 'col-span-3': canModifyPosition(), 'col-span-5': !canModifyPosition() }"
            >
              {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
            </p>
            <p v-else class="col-span-3 mb-0">Vacant</p>
            <div v-if="canModifyPosition()" class="col-span-2 text-right">
              <button
                type="button"
                class="btn bg-yellow-400 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="assign[position.id] = !assign[position.id]"
              >
                <i class="fas fa-user"></i>
              </button>
              <div
                class="absolute z-10 mt-1 w-40 text-center bg-white rounded divide-y divide-gray-600 shadow dark:bg-black-deep dark:divide-gray-400 border border-yellow-400"
                :class="{ hidden: !assign[position.id] }"
              >
                <div class="py-1.5 text-sm text-gray-900 dark:text-white">
                  <p v-if="position.user != null" class="font-medium">
                    {{ toTitleCase(`${position.user.first_name} ${position.user.last_name}`) }}
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(0, position.position);
                        position.user = null;
                      "
                    >
                      <i class="fas fa-xmark mr-2"></i>Unassign
                    </a>
                  </p>
                  <p v-else class="font-medium truncate">Vacant</p>
                </div>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li v-for="signup in signupsForPos(position.position)" :key="signup.id">
                    <a
                      class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
                      @click="
                        assignPosition(signup.user.cid, position.position);
                        position.user = signup.user;
                      "
                    >
                      {{ toTitleCase(`${signup.user.first_name} ${signup.user.last_name}`) }}
                    </a>
                  </li>
                  <li v-if="signupsForPos(position.position).length === 0">
                    <p class="block py-2 px-4">No Signups</p>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
                    @click="
                      toggleModal(position.position);
                      assign[position.id] = !assign[position.id];
                    "
                  >
                    <i class="fas fa-plus"></i> Manually Assign
                  </a>
                </div>
              </div>
              <!--              <assign-position-modal :id="position.id" />-->
              <button
                type="button"
                class="btn bg-red-500 text-white font-bold py-0.5 px-2 ml-2 rounded"
                @click="deletePosition(position.position)"
              >
                <i class="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70">
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/3">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Assign Position</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="toggleModal('')"
        >
          <i class="fas fa-xmark w-4"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <form>
          <div class="relative z-0 w-full group">
            <input
              id="controller-id"
              v-model="controllerId"
              type="text"
              class="block px-2.5 pb-1 pt-2 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
              placeholder=" "
              list="controllers"
            />
            <label
              for="controller-id"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >Controller ID</label
            >
            <datalist id="controllers">
              <option v-for="controller in rosterStore.getActiveRoster" :key="controller.cid" :value="controller.cid">
                {{ toTitleCase(`${controller.first_name} ${controller.last_name}`) }}
              </option>
            </datalist>
          </div>
        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="assignPosition(parseInt(controllerId), assignPosSelected)"
        >
          Assign
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="toggleModal('')"
        >
          Cancel
        </button>
      </div>
      <alert v-if="error != null" type="error"
        ><b>Error</b>: There was an error assigning the position, recheck the CID and try again.
        {{ error }}
      </alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { EventPosition, EventSignup } from "@/types";
import { hasRole, isAuthenticated } from "@/utils/auth";
import Alert from "@/components/Alert.vue";
import { toTitleCase } from "@/utils/helpers";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/api";

const rosterStore = useRosterStore();
const isOpen = ref(false);
const assignPosSelected = ref("");
const controllerId = ref();
const error = ref();

const emit = defineEmits<{
  (e: "update"): void;
}>();

type Props = {
  eventId: number;
  type: string;
  positions: EventPosition[];
  signups: EventSignup[];
};
const props = defineProps<Props>();

const assign = ref({});

const toggleModal = (s: string): void => {
  assignPosSelected.value = s;
  isOpen.value = !isOpen.value;
  window.scrollTo(0, 0);
  error.value = null;
};

const enroutePositions = computed(() => {
  if (props.positions) {
    return props.positions.filter((pos) => pos.position.includes("_CTR"));
  }
  return [];
});
const traconPositions = computed(() => {
  if (props.positions) {
    return props.positions.filter((pos) => pos.position.includes("_APP") || pos.position.includes("_DEP"));
  }
  return [];
});
const localPositions = computed(() => {
  if (props.positions) {
    return props.positions.filter(
      (pos) => pos.position.includes("_TWR") || pos.position.includes("_GND") || pos.position.includes("_DEL")
    );
  }
  return [];
});

const signupsForPos = (position: string): EventSignup[] => {
  if (props.signups) {
    return props.signups.filter(
      (signup) => signup.choice1 === position || signup.choice2 === position || signup.choice3 === position
    );
  }
  return [];
};

const canModifyPosition = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ec", "wm"]);
};

const assignPosition = async (cid: number, position: string): Promise<void> => {
  if (canModifyPosition()) {
    try {
      const result = await ZDVAPI.put(`/v1/events/${props.eventId}/positions/${position}`, {
        cid,
      });
      if (result.status === 200) {
        emit("update");
        if (cid !== 0) {
          toggleModal("");
          isOpen.value = false;
          controllerId.value = null;
        }
      }
    } catch (err) {
      error.value = err;
    }
  }
};

const deletePosition = async (position: string): Promise<void> => {
  try {
    const result = await ZDVAPI.delete(`/v1/events/${props.eventId}/positions/${position}`);
    if (result.status === 204) {
      emit("update");
    }
  } catch (err) {
    error.value = err;
  }
};

onMounted(async (): Promise<void> => {
  await rosterStore.fetchRoster();
});
</script>

<style scoped></style>
