<template>
  <div v-if="loading" class="flex flex-wrap">Loading ...</div>
  <div v-else class="flex flex-wrap">
    <div class="grid grid-cols-4 gap-4 w-full m-0">
      <div class="col-span-3">
        <h1 class="text-2xl mb-0">
          {{ controller.first_name }} {{ controller.last_name }} - {{ controller.operating_initials }} ({{
            controller.cid
          }}/{{ controller.rating }})
        </h1>
        <h2 class="text-sm mt-0 mb-1 font-normal">{{ getControllerTitle(controller) }}</h2>
      </div>
      <div class="col-span-1 text-right mt-auto mb-auto">
        <RouterLink to="/roster">
          <button class="flex-1 bg-colorado-red text-white hover:bg-dark-red font-bold py-2 px-4 rounded">
            Back to Roster
          </button>
        </RouterLink>
      </div>
    </div>
    <div class="w-full">
      <ControllerCertificationBadges
        :controller="(rosterStore.getController(cid) as Controller)"
        class="align-middle"
      />
    </div>
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 1,
              'text-white bg-colorado-blue': openTab === 1,
            }"
            @click="toggleTabs(1)"
          >
            Profile
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 2,
              'text-white bg-colorado-blue': openTab === 2,
            }"
            @click="toggleTabs(2)"
          >
            Training Notes
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== 3,
              'text-white bg-colorado-blue': openTab === 3,
            }"
            @click="toggleTabs(3)"
          >
            Actions
          </a>
        </li>
      </ul>

      <div class="relative flex flex-col min-w-0 break-words light:bg-white w-full mb-6 shadow-lg rounded">
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
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
              <h2 class="text-3xl mt-4">Certifications</h2>
              <div class="flex items-center mb-4">
                <div class="w-1/5">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="ground-cert">
                    Ground
                  </label>
                </div>
                <div class="w-1/5">
                  <select
                    id="ground-cert"
                    v-model="certs.ground"
                    data-position="ground"
                    class="block w-full bg-white dark:bg-black-deep border border-gray-200 text-gray-700 dark:text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:dark:bg-black-light focus:border-gray-500"
                    @change="onChange($event)"
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
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="local-cert">
                    Local
                  </label>
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
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="major-approach-cert"
                  >
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
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="enroute-cert">
                    Enroute
                  </label>
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
                  <button class="btn bg-colorado-blue text-white font-bold py-2 px-4 rounded">Save</button>
                </div>
              </div>
            </div>
            <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">asdfasdfasdfasdfasdfasdfasdf</div>
            <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">asdfasdfasdfasdfasdfasdfasdf</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { Controller } from "@/types";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";
import { getControllerTitle } from "@/utils/helpers";
import { hasRole } from "@/utils/auth";
import useRosterStore from "@/stores/roster";

const loading = ref(true);
const openTab = ref(1);
const route = useRoute();
const rosterStore = useRosterStore();
const cid = parseInt(route.params.cid as string, 10);
const controller = ref(rosterStore.getController(cid) as Controller);
const certs = { ...controller.value.certifications }; // Dereference

onMounted(() => {
  if (controller.value) {
    loading.value = false;
  } else {
    rosterStore.fetchRoster().then(() => {
      controller.value = rosterStore.getController(parseInt(route.params.cid as string, 10)) as Controller;
      loading.value = false;
    });
  }
});

const toggleTabs = (tab: number): void => {
  openTab.value = tab;
};
</script>

<style scoped>
.bg-dark-red {
  background-color: #b91c1c;
}
</style>
