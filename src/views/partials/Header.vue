<template>
  <div v-if="isSticky">
    <div class="h-[98px]"></div>
  </div>
  <div
    class="header-main shadow-md mb-[10px]"
    :class="[
      navbarClasses,
      isSticky ? 'fixed top-0 left-0 w-full z-50 transition-all shadow-md animate-fadeInDown' : '',
    ]"
  >
    <div class="py-4 lg:py-1">
      <div class="container">
        <div class="grid grid-cols-4 items-center justify-between">
          <div class="col-span-3 lg:col-span-1 logo">
            <router-link to="/">
              <img :src="fac.logo" class="h-[50px]" alt="logo" />
              <h1 class="text-[20px] font-semibold inline align-middle pl-4">{{ fac.navbarName || fac.name }}</h1>
            </router-link>
          </div>
          <div class="col-span-2 lg:col-span-3 hidden lg:block ml-auto">
            <HeaderNav />
          </div>
          <div class="col-span-1 text-right block lg:hidden">
            <button
              class="text-white text-xl w-11 h-11 leading-10 rounded-md border-[1px] border-white hover:bg-primary hover:text-white hover:border-white transition-all"
              @click="toggleNav()"
            >
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <OffcanvasMenu :class="{ 'show-mobile-menu': navOpen }" @toggle="toggleNav()" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import fac from "@/facility";
import HeaderNav from "@/components/header/HeaderNav.vue";
import OffcanvasMenu from "@/components/header/OffcanvasMenu.vue";

const isSticky = ref(false);
const navOpen = ref(false);

const toggleNav = (): void => {
  navOpen.value = !navOpen.value;
};

const navbarClasses = ref(fac.navbarClasses || "bg-colorado-blue text-white dark:bg-black-deep");

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 88) {
      isSticky.value = true;
    }
    if (window.scrollY === 0) {
      isSticky.value = false;
    }
  });
});
</script>

<style scoped lang="postcss">
.zdvcolors {
  text-shadow: 2px 2px 5px #fff;
}
.show-mobile-menu {
  @apply opacity-100 visible;
}
</style>
