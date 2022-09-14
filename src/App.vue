<template>
  <div class="theme-blue dark:bg-black-light dark:text-white">
    <Header />
    <main>
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/views/partials/Footer.vue";
import Header from "@/views/partials/Header.vue";
</script>
