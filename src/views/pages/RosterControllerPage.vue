<template>
  <div v-if="loading" class="flex flex-wrap">Loading ...</div>
  <div v-else :key="controller.cid" class="flex flex-wrap">
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
              <ControllerProfile :controller="controller" />
            </div>
            <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">asdfasdfasdfasdfasdfasdfasdf</div>
            <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <ControllerActions :controller="controller" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import { Controller } from "@/types";
import ControllerActions from "@/views/partials/roster/ControllerActions.vue";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";
import ControllerProfile from "@/views/partials/roster/ControllerProfile.vue";
import { getControllerTitle } from "@/utils/helpers";
import useRosterStore from "@/stores/roster";

const loading = ref(true);
const openTab = ref(1);
const route = useRoute();
const rosterStore = useRosterStore();
const { controllers } = storeToRefs(rosterStore);
const cid = parseInt(route.params.cid as string, 10);
const controller = ref(rosterStore.getController(cid) as Controller);

onMounted(() => {
  if (controller.value) {
    loading.value = false;
  } else {
    rosterStore.fetchRoster().then(() => {
      controller.value = rosterStore.getController(parseInt(route.params.cid as string, 10)) as Controller;
      loading.value = false;
    });
  }

  // Allow navigation direct to tab
  const { hash } = window.location;
  if (hash && hash.startsWith("#tab")) {
    const tab = parseInt(hash.replace("#tab", ""), 10);
    if (tab) {
      openTab.value = tab;
    }
  }
});

watch(controllers, () => {
  controller.value = controllers.value.find((c) => c.cid === cid) as Controller;
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