<template>
  <div class="rounded-md flex flex-col break-words mb-5 shadow-sm p-2">
    <div class="flex-auto">
      <div>
        <h4 class="mb-0">{{ props.controller.first_name }} {{ props.controller.last_name }}</h4>
        <p class="m-0 italic">{{ props.title }}</p>
      </div>
    </div>
    <p class="mt-4">
      {{ description }}
    </p>
    <a :href="`mailto:${props.position}@${emailDomain}`">
      <i class="fa-solid fa-envelope"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/types";
import fac from "@/facility";
import { ref } from "vue";
import { StaffDescriptions } from "@/descriptions";

type Props = {
  controller: Controller;
  position: string;
  title: string;
};
const emailDomain = fac.domain;
const props = defineProps<Props>();
const description = ref(StaffDescriptions[props.position] || "Unknown");
</script>

<style scoped></style>
