<template>
  <li class="mb-1.5 relative group">
    <RouterLink :to="props.to" class="font-semibold leading-9 capitalize text-heading-light group-hover:text-primary">
      {{ props.title }}
    </RouterLink>
    <span
      v-if="props.sublinks.length > 0"
      class="submenu-toggle text-lg w-9 h-9 leading-9 top-0 right-0 absolute text-center cursor-pointer bg-[#f4f4f4] inline-block"
    >
      <i v-if="props.sublinks.length > 0" class="fa-solid fa-chevron-down ml-2"></i>
    </span>
    <ul v-if="props.sublinks.length" class="submenu hidden pt-1.5 pl-4">
      <li v-for="(link, index) in props.sublinks" :key="index" class="mb-1.5 font-medium hover:text-primary">
        <RouterLink :to="link.to"> {{ link.title }} </RouterLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { Link } from "./links";

const props = withDefaults(defineProps<Link>(), {
  sublinks: () => [],
});
</script>

<style scoped></style>
