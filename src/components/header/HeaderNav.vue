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
    </ul>
  </nav>
</template>

<script setup lang="ts">
import links from "@/links";

import HeaderNavItem from "./HeaderNavItem.vue";
</script>

<style scoped></style>
