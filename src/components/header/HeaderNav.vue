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
import HeaderNavItem from "./HeaderNavItem.vue";
import links from "./links";
</script>

<style scoped></style>
