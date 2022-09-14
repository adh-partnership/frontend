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
  <PartialHeader />
</template>

<script lang="ts" setup>
import HeaderBar from "./components/HeaderBar.vue";
</script>
