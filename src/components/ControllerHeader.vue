<template>
  <div class="grid grid-cols-4 gap-4 w-full m-0">
    <div class="col-span-3">
      <h1 class="text-2xl mb-0">
        {{ toTitleCase(`${props.controller.first_name} ${props.controller.last_name}`) }} -
        {{ props.controller.operating_initials }} ({{ props.controller.cid }}/{{ props.controller.rating }})
      </h1>
      <h2 class="text-sm mt-0 mb-1 font-normal">{{ getControllerTitle(props.controller) }}</h2>
    </div>
    <div class="col-span-1 text-right mt-auto mb-auto">
      <slot></slot>
    </div>
  </div>
  <div class="w-full">
    <ControllerCertificationBadges :controller="props.controller" class="align-middle" />
  </div>
</template>

<script setup lang="ts">
import { getControllerTitle, toTitleCase } from "@/utils/helpers";
import type { Controller } from "@/types";
import ControllerCertificationBadges from "@/components/ControllerCertificationBadges.vue";

const props = defineProps<{
  controller: Controller;
}>();
</script>

<style scoped></style>
