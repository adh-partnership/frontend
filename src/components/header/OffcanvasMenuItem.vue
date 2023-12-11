<template>
  <li class="mb-1.5 relative group">
    <AuthLink
      :to="props.to"
      :href="props.href"
      :auth="props.auth"
      :roles="props.roles"
      :rostered-controller="props.rosteredController"
      :same-window="props.sameWindow"
      :hide-unauthed="props.auth === true"
      class="font-semibold leading-9 capitalize text-heading-light dark:text-white dark:group-hover:text-colorado-yellow group-hover:text-colorado-red"
      @click="checkClick()"
    >
      {{ props.title }}
    </AuthLink>
    <span
      v-if="props.sublinks.length > 0"
      class="submenu-toggle text-lg w-9 h-9 leading-9 top-0 right-0 absolute text-center cursor-pointer inline-block text-primary dark:text-colorado-yellow"
    >
      <i v-if="props.sublinks.length > 0" class="fa-solid fa-chevron-down ml-2"></i>
    </span>
    <ul v-if="props.sublinks.length > 0" class="submenu pt-1.5 pl-4">
      <li
        v-for="(sl, index) in props.sublinks"
        :key="index"
        class="mb-1.5 font-medium hover:text-colorado-red text-primary dark:hover:text-colorado-yellow dark:text-gray-light"
      >
        <AuthLink
          :to="sl.to"
          :href="sl.href"
          :auth="sl.auth"
          :rostered-controller="sl.rosteredController"
          :roles="sl.roles"
          :same-window="sl.sameWindow"
          :hide-unauthed="sl.auth === true"
        >
          {{ sl.title }}
        </AuthLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { Link } from "@/types";

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
</script>
