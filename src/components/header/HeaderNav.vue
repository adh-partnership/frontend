<template>
  <nav class="navigation-menu">
    <ul class="flex">
      <HeaderNavItem
        v-for="(link, index) in links"
        :key="index"
        :title="link.title"
        :to="link.to"
        :sublinks="link.sublinks"
      >
      </HeaderNavItem>
      <HeaderNavItem v-if="!userStore.isLoggedIn" title="Login" :href="`${apiUrl}/v1/user/login?redirect=${loc}`" />
      <HeaderNavItem v-else :title="getName()" :sublinks="profilelinks" to="#" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import links, { ProfileLinks as profilelinks } from "@/links";
import apiUrl from "@/utils/api";
import { toTitleCase } from "@/utils/helpers";
import useUserStore from "@/stores/users";

import HeaderNavItem from "./HeaderNavItem.vue";

const userStore = useUserStore();

const getName = (): string => {
  return toTitleCase(`${userStore.user?.first_name} ${userStore.user?.last_name}`);
};

// eslint-disable-next-line no-restricted-globals
const loc = location.href;
</script>

<style scoped></style>
