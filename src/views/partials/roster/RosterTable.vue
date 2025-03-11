<template>
  <RosterFilterPanel v-model="filteredRoster" :roster="roster" :certifications="certifications" />
  <div>
    <table
      v-for="(controller, index) in filteredRoster"
      :key="controller.cid"
      class="w-full cursor-pointer"
      :class="{ 'bg-slate-100 dark:bg-slate-800': (index - 1) % 2, 'dark:bg-slate-900 bg-slate-50': index % 2 }"
      @click="goToController(controller.cid)"
    >
      <tbody class="border-collapse text-center w-full">
        <tr>
          <td class="w-[5em] py-2">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-400 mb-0">
              {{ controller.operating_initials }}
            </h2>
          </td>
          <td class="w-[2em] py-2">
            <div
              class="float-right rounded-full w-[1em] h-[1em]"
              :class="genStatusClass(controller.status)"
              :data-tooltip-target="`tooltip-status-${controller.cid}`"
            />
          </td>
          <td class="w-3/10 pl-4 text-left py-2">
            <h5 class="mb-0 text-xl">{{ `${controller.first_name} ${controller.last_name}` }}</h5>
            <p class="mb-0">{{ getControllerTitle(controller) }} ({{ controller.rating }})</p>
          </td>
          <td class="w-full pl-3 hidden md:block py-2">
            <ControllerCertificationBadges :controller="controller" :show-active="true" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import type { CertificationItem, Controller } from "@/types";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";
import { getControllerTitle } from "@/utils/helpers";
import RosterFilterPanel from "@/views/partials/roster/filtering/RosterFilterPanel.vue";
import { ref } from "vue";

const router = useRouter();
const props = defineProps<{
  roster: Controller[];
  certifications: CertificationItem[];
}>();

const filteredRoster = ref(props.roster);

const goToController = (cid: number): void => {
  router.push(`/roster/${cid}`);
};

const genStatusClass = (status: string): string => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "inactive":
      return "bg-yellow-600";
    case "loa":
      return "bg-purple-600";
    default:
      return "bg-neutral-500";
  }
};
</script>

<style lang="scss" scoped>
.w-1\/10 {
  width: 10%;
}
</style>
