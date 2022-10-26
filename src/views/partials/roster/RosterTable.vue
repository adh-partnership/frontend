<template>
  <div>
    <table
      v-for="(controller, index) in props.roster"
      :key="controller.cid"
      class="w-full dark:bg-slate-900 bg-slate-50"
      :class="{ 'bg-slate-100 dark:bg-slate-800': (index - 1) % 2, 'cursor-pointer': canGoToController() }"
      @click="goToController(controller.cid)"
    >
      <tbody class="border-collapse text-center w-full">
        <tr>
          <td class="w-1/10">
            <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-400 mb-0">
              {{ controller.operating_initials }}
            </h2>
          </td>
          <td class="w-2/5 pl-4 py-2 text-left">
            <h5 class="mb-0 text-xl">{{ `${controller.first_name} ${controller.last_name}` }}</h5>
            <p class="mb-0">{{ getControllerTitle(controller) }}</p>
          </td>
          <td class="w-1/2 pl-3 py-2">
            <ControllerCertificationBadges :controller="controller" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { hasRole, isAuthenticated } from "@/utils/auth";
import type { Controller } from "@/types";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";
import { getControllerTitle } from "@/utils/helpers";

const router = useRouter();
const props = defineProps<{
  roster: Controller[];
}>();

const canGoToController = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ta", "wm", "ins", "mtr"]);
};

const goToController = (cid: number): void => {
  if (canGoToController()) {
    router.push(`/roster/${cid}`);
  }
};
</script>

<style lang="scss" scoped>
.w-1\/10 {
  width: 10%;
}
</style>
