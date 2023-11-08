<template>
  <li class="relative mr-12 group">
    <AuthLink
      :to="props.to"
      :href="props.href"
      :auth="props.auth"
      :roles="props.roles"
      :rostered-controller="props.rosteredController"
      :hide-unauthed="props.auth === true"
      class="block text-[16px] font-semibold group-hover:text-colorado-yellow py-7 text-white group-hover:cursor-pointer"
      @click="checkClick()"
    >
      {{ props.title }} <i v-if="props.sublinks.length > 0" class="fa-solid fa-chevron-down ml-2"></i>
    </AuthLink>
    <ul
      v-if="props.sublinks.length > 0"
      class="top-full left-0 absolute w-[200px] bg-white dark:bg-black-deep border-b-[3px] border-primary py-4 shadow-md shadow-black/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-[20px] group-hover:translate-y-0 z-30"
    >
      <li v-for="(link, index) in sublinkcomputed" :key="index">
        <AuthLink
          :to="link.to"
          :href="link.href"
          :auth="link.auth"
          :roles="link.roles"
          :rostered-controller="link.rosteredController"
          :hide-unauthed="link.auth === true"
          class="block text-heading-light dark:text-white-deep font-semibold py-1 px-4 hover:text-primary dark:hover:text-colorado-yellow hover:bg-gray-light dark:hover:bg-body"
        >
          {{ link.title }}
        </AuthLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import AuthLink from "@/components/AuthLink.vue";
import { computed } from "vue";
import { Link } from "@/types";

const props = withDefaults(defineProps<Link>(), {
  title: "",
  to: "#",
  sublinks: () => [],
});

// @TODO Replace by extending RouteLink
const checkClick = (): boolean => {
  if (props.href) {
    window.location.href = props.href;
    return false;
  }
  return true;
};

const sublinkcomputed = computed(() => {
  const sublinks = props.sublinks;
  return sublinks.sort((a, b) => {
    // Sort by weight, then title
    if ((a.weight || 0) < (b.weight || 0)) return -1;
    if ((a.weight || 0) > (b.weight || 0)) return 1;
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
});
</script>

<style scoped></style>
