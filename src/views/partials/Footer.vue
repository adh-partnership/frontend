<template>
  <div class="bg-gray-light dark:bg-black-deep dark:text-white">
    <div class="footer-main mt-10 py-4">
      <div class="container text-sm">
        <p>Dates and times will always be presented in your local time unless otherwise indicated.</p>
        <p>
          This site is not affiliated with the Federal Aviation Administration or any governing aviation body. All
          content contained herein is approved only for use on the VATSIM network.
        </p>
      </div>
    </div>
  </div>
  <div :class="footerClasses">
    <div class="py-4">
      <div class="container text-sm">
        Copyright &copy; {{ new Date().getFullYear() }} by {{ fac.name }}.
        <RouterLink to="/privacy">Privacy Policy</RouterLink>. Open Source at
        <a href="https://github.com/adh-partnership/frontend">GitHub</a> (version: {{ version }}-{{ gitHash }}).
        <div class="float-right text-right">
          <button @click="toggleDark()">
            <i v-if="isDark" class="fa-solid fa-sun"></i>
            <i v-else class="fa-solid fa-moon"></i>
            <span class="ml-2">{{ isDark ? "Light" : "Dark" }} Mode</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

import fac from "@/facility";
import { footerClasses } from "@/utils/colors";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const gitHash = import.meta.env.VITE_GIT_HASH || "dirty";
const version = import.meta.env.VITE_VERSION_BASE || "unknown";
</script>

<style scoped lang="postcss">
a {
  @apply text-colorado-yellow hover:text-colorado-red;
}
</style>
