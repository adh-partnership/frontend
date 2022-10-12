<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Roster</h1>

    <div class="rounded-md w-full bg-white dark:bg-black-deep border-1 drop-shadow-md flex flex-col">
      <div v-if="!fetched" class="m-3">Getting roster...</div>
      <div v-else-if="fetched && error !== ''">
        <div class="m-3">Error getting roster: {{ error }}</div>
      </div>
      <div v-else>
        <table
          v-for="(controller, index) in roster.sort((a, b) => a.last_name.localeCompare(b.last_name))"
          :key="controller.cid"
          class="cursor-pointer w-full"
          :class="{ shaded: (index - 1) % 2 }"
        >
          <tbody class="border-collapse text-center">
            <tr>
              <td class="w-1/10">
                <h2 class="text-3xl font-bold text-muted mb-0">
                  {{ controller.operating_initials }}
                </h2>
              </td>
              <td class="w-2/5 pl-4 py-2 text-left">
                <h5 class="mb-0 text-xl">{{ `${controller.first_name} ${controller.last_name}` }}</h5>
                <p class="mb-0">{{ getTitle(controller) }}</p>
              </td>
              <td class="w-1/2 pl-3 py-2">
                <ControllerCertificationBadges :controller="controller" :dark="isDark" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDark } from "@vueuse/core";

import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";

import type { Controller } from "@/types";
import { ZDVAPI } from "@/utils/axios";

const fetched = ref(false);
const error = ref("");
const roster = ref<Controller[]>([]);
const isDark = useDark();

async function getRoster(): Promise<void> {
  try {
    const { data } = await ZDVAPI.get("/v1/user/roster");
    roster.value = data;
    fetched.value = true;
  } catch (e) {
    error.value = "Error fetching roster";
  } finally {
    fetched.value = true;
  }
}

function getTitle(controller: Controller): string {
  if (controller.roles.includes("atm")) {
    return "Air Traffic Manager";
  }
  if (controller.roles.includes("datm")) {
    return "Deputy Air Traffic Manager";
  }
  if (controller.roles.includes("ta")) {
    return "Training Administrator";
  }
  if (controller.roles.includes("ec")) {
    return "Events Coordinator";
  }
  if (controller.roles.includes("fe")) {
    return "Facility Engineer";
  }
  if (controller.roles.includes("wm")) {
    return "Webmaster";
  }
  if (controller.rating === "I1" && controller.status === "home") {
    return "Instructor";
  }
  if (controller.roles.includes("mtr")) {
    return "Mentor";
  }
  if (controller.status === "visitor") {
    return "Visiting Controller";
  }

  return "Controller";
}

onMounted(() => {
  getRoster();
});
</script>

<style lang="scss" scoped>
.shaded {
  background-color: rgba(0, 0, 0, 0.03);
}
.text-muted {
  color: #6c757d;
}
</style>
