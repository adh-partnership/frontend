<template>
  <div class="rounded-md flex flex-col break-words mb-5 shadow-sm p-2 border-1 dark:border-gray-600">
    <div class="flex-auto">
      <div>
        <h2 class="text-xl">{{ props.title }}</h2>
        <p class="my-2">
          {{ description }}
        </p>
        <ul>
          <li v-for="c in props.controllers" :key="c.cid" class="list-disc ml-4">
            {{ toTitleCase(`${c.first_name} ${c.last_name}`) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/types";
import { ref } from "vue";
import { StaffDescriptions } from "@/descriptions";
import { toTitleCase } from "@/utils/helpers";

type Props = {
  controllers: Controller[];
  position: string;
  title: string;
};
const props = defineProps<Props>();
const description = ref(StaffDescriptions[props.position] || "Unknown");
</script>

<style scoped></style>
