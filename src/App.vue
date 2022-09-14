<template>
  <div class="theme-blue">
    <HeaderBar />
    <main>
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
    <!-- Footer ?? -->
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "./components/header/HeaderBar.vue";
</script>
