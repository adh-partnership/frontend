<template>
  <li class="relative mr-12 group">
    <RouterLink :to="props.to" class="block text-[16px] font-semibold group-hover:text-white py-7 text-white">
      {{ props.title }} <i v-if="props.sublinks.length > 0" class="fa-solid fa-chevron-down ml-2"></i>
    </RouterLink>

    <ul
      v-if="props.sublinks.length > 0"
      class="top-full left-0 absolute w-[200px] bg-white border-b-[3px] border-primary py-4 shadow-md shadow-black/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 z-30"
    >
      <li v-for="(link, index) in props.sublinks" :key="index">
        <RouterLink :to="link.to" class="block text-heading-light font-semibold py-1 px-4 hover:text-primary">
          {{ link.title }}
        </RouterLink>
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
