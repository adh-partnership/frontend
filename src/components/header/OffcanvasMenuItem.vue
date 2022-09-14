<template>
  <li class="mb-1.5 relative group">
    <RouterLink
      :to="props.to"
      class="font-semibold leading-9 capitalize text-heading-light dark:text-white dark:group-hover:text-colorado-yellow group-hover:text-colorado-red"
    >
      {{ props.title }}
    </RouterLink>
    <span
      v-if="props.sublinks.length > 0"
      class="submenu-toggle text-lg w-9 h-9 leading-9 top-0 right-0 absolute text-center cursor-pointer inline-block text-primary dark:text-colorado-yellow"
    >
      <i v-if="props.sublinks.length > 0" class="fa-solid fa-chevron-down ml-2"></i>
    </span>
    <ul v-if="props.sublinks.length" class="submenu pt-1.5 pl-4">
      <li
        v-for="(sl, index) in props.sublinks"
        :key="index"
        class="mb-1.5 font-medium hover:text-colorado-red text-primary dark:hover:text-colorado-yellow dark:text-gray-light"
      >
        <RouterLink :to="sl.to"> {{ sl.title }} </RouterLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { Link } from "@/types";

const props = withDefaults(defineProps<Link>(), {
  sublinks: () => [],
});
</script>

<style scoped>
li {
  @apply text-black;
}
</style>
