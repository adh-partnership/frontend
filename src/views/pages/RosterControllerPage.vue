<template>
  <div v-if="loading" class="flex flex-wrap">Loading ...</div>
  <div v-else :key="controller.cid" class="flex flex-wrap">
    <ControllerHeader :controller="controller">
      <RouterLink :to="{ name: lastRoster }">
        <button class="flex-1 bg-colorado-red text-white hover:bg-dark-red font-bold py-2 px-4 rounded">
          Back to Roster
        </button>
      </RouterLink>
    </ControllerHeader>
    <div class="w-full">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="openTab === 1 ? primaryBackground : 'dark:text-white light:text-colorado-blue light:bg-white'"
            @click="toggleTabs(1)"
          >
            Profile
          </a>
        </li>
        <li v-if="canWorkController() || isMe()" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="openTab === 2 ? primaryBackground : 'dark:text-white light:text-colorado-blue light:bg-white'"
            @click="toggleTabs(2)"
          >
            Training Notes
          </a>
        </li>
        <li v-if="canActionController()" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="openTab === 3 ? primaryBackground : 'dark:text-white light:text-colorado-blue light:bg-white'"
            @click="toggleTabs(3)"
          >
            Feedback
          </a>
        </li>
        <li v-if="canActionController()" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="cursor-pointer text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
            :class="openTab === 4 ? primaryBackground : 'dark:text-white light:text-colorado-blue light:bg-white'"
            @click="toggleTabs(4)"
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
            <div v-if="canWorkController() || isMe()" :class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <TrainingNotes :controller="controller" />
            </div>
            <div v-if="canActionController()" :class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <div v-if="!feedbacks" class="text-center">
                <center><Spinner class="fill-colorado-blue" large /></center>
                <p class="mt-4">Loading feedback...</p>
              </div>
              <div v-else>
                <table class="w-full text-center table table-fixed">
                  <thead class="border-b-1">
                  <tr>
                    <th class="w-24">Position</th>
                    <th class="w-24">Rating</th>
                    <th class="hidden md:block">Comment</th>
                    <th class="w-24">Feedback Date</th>
                    <th class="w-24 md:hidden">View</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="feedback in userFeedbacks"
                    :key="feedback.id"
                    class="border-b-8 border-white dark:border-black-light"
                  >
                    <td>{{ feedback.position }}</td>
                    <td>{{ feedback.rating.charAt(0).toUpperCase() + feedback.rating.slice(1) }}</td>
                    <td class="hidden md:block">{{ feedback.comments }}</td>
                    <td>{{ new Date(feedback.created_at).toLocaleDateString() }}</td>
                    <td class="md:hidden">
                      <button
                        class="btn bg-blue-800 hover:bg-blue-900 text-white"
                        type="button"
                        @click="goTo(feedback.id)"
                      >
                        <i class="fa fa-envelope-open w-[15px]" />
                      </button>
                    </td>
                  </tr>
                  <tr v-if="userFeedbacks.length === 0">
                    <td colspan="7">There is no feedback.</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="canActionController()" :class="{ hidden: openTab !== 4, block: openTab === 4 }">
              <ControllerActions :controller="controller" />
              <ControllerRoles :controller="controller" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Controller } from "@/types";
import { primaryBackground } from "@/utils/colors";
import { storeToRefs } from "pinia";

import ControllerActions from "@/views/partials/roster/ControllerActions.vue";
import ControllerHeader from "@/components/ControllerHeader.vue";
import ControllerProfile from "@/views/partials/roster/ControllerProfile.vue";
import ControllerRoles from "@/views/partials/roster/ControllerRoles.vue";
import TrainingNotes from "@/views/partials/training/TrainingNotes.vue";
import useRosterStore from "@/stores/roster";
import useUserStore from "@/stores/users";

const loading = ref(true);
const openTab = ref(1);
const route = useRoute();
const router = useRouter();
const rosterStore = useRosterStore();
const { controllers, lastRoster } = storeToRefs(rosterStore);
const userStore = useUserStore();
const cid = route.params.cid === "me" ? userStore.user?.cid : parseInt(route.params.cid as string, 10);
const controller = ref(cid ? (rosterStore.getController(cid) as Controller) : ({} as Controller));

const isMe = (): boolean => {
  return isAuthenticated() && cid === userStore.user?.cid;
};

const canWorkController = (): boolean => {
  return (
    isAuthenticated() &&
    (hasRole(userStore.getPermissionGroups?.admin) || hasRole(userStore.getPermissionGroups?.training))
  );
};

const canActionController = (): boolean => {
  return canWorkController() || hasRole(["fe", "ec"]);
};

onBeforeMount(() => {
  if (route.params.cid === "me") {
    router.push(`/roster/${userStore.user?.cid}${window.location.hash}`);
  }
});

onMounted(() => {
  rosterStore.fetchCertifications();
  if (controller.value) {
    loading.value = false;
  } else {
    rosterStore.fetchRoster().then(() => {
      controller.value = rosterStore.getController(parseInt(route.params.cid as string, 10)) as Controller;

      if (controller.value === undefined) {
        router.push({ name: "NotFound" });
      } else {
        loading.value = false;
      }
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
