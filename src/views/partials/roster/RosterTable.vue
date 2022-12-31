<template>
  <div>
    <table
      v-for="(controller, index) in props.roster"
      :key="controller.cid"
      class="w-full dark:bg-slate-900 bg-slate-50 cursor-pointer"
      :class="{ 'bg-slate-100 dark:bg-slate-800': (index - 1) % 2 }"
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
            <p class="mb-0">{{ getControllerTitle(controller) }} ({{ controller.rating }})</p>
          </td>
          <td class="w-1/2 pl-3 py-2 hidden md:inline">
            <ControllerCertificationBadges :controller="controller" :show-active="true" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import type { Controller } from "@/types";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";
import { getControllerTitle } from "@/utils/helpers";

const router = useRouter();
const props = defineProps<{
  roster: Controller[];
}>();

const goToController = (cid: number): void => {
  router.push(`/roster/${cid}`);
};
</script>

<style lang="scss" scoped>
.w-1\/10 {
  width: 10%;
}
</style>
