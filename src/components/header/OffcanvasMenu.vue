<template>
  <div class="fixed top-0 left-0 w-screen h-screen opacity-0 invisible z-50 transition-all">
    <div class="top-0 left-0 w-full h-full absolute bg-black bg-opacity-80 content-['']" @click="$emit('toggle')"></div>
    <div
      class="mobile-menu-inner relative w-[400px] max-w-[80%] h-full text-left bg-white dark:bg-black-deep dark:text-white -translate-x-full transition-all"
    >
      <button
        aria-label="Settings"
        class="absolute top-0 left-full w-16 h-16 text-4xl text-heading-light hover:text-primary bg-white dark:bg-black-light dark:text-white group"
        @click="$emit('toggle')"
      >
        <i class="fa-solid fa-xmark group-hover:rotate-180 block transition-all duration-500"></i>
      </button>
      <div class="h-full overflow-y-auto">
        <div class="px-5 py-8">
          <div class="menu-navigation">
            <ul class="mobile-menu">
              <OffcanvasMenuItem
                v-for="(link, index) in links"
                :key="index"
                :title="link.title"
                :to="link.to"
                :sublinks="link.sublinks"
              ></OffcanvasMenuItem>
              <OffcanvasMenuItem
                v-if="!userStore.isLoggedIn"
                title="Login"
                :href="`${apiUrl}/v1/user/login?redirect=${loc}`"
              />
              <OffcanvasMenuItem v-else :title="getName()" to="#" :sublinks="profilelinks" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import links, { ProfileLinks as profilelinks } from "@/links";
import apiUrl from "@/utils/api";
import useUserStore from "@/stores/users";

import OffcanvasMenuItem from "./OffcanvasMenuItem.vue";

const userStore = useUserStore();

const getName = (): string => {
  return `${userStore.user?.first_name} ${userStore.user?.last_name}`;
};

// eslint-disable-next-line no-restricted-globals
const loc = location.href;

defineEmits(["toggle"]);
</script>

<style scoped>
.submenu.active {
  @apply block;
}

.submenu-toggle.active i {
  @apply -rotate-180 inline-block transition-all;
}
.mobile-menu-inner {
  @apply transform-none;
}
</style>
