<template>
  <div v-if="userStore.hasFetched" class="dark:bg-black-light dark:text-white">
    <Header />
    <main>
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
  <div v-else class="dark:bg-black-deep dark:text-white">
    <div class="flex items-center justify-center h-screen">
      <Spinner :size="16" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/views/partials/Footer.vue";
import Header from "@/views/partials/Header.vue";
import Spinner from "@/components/Spinner.vue";
import useUserStore from "@/stores/users";

const userStore = useUserStore();
</script>

<style lang="scss">
.bg-green {
  background-color: #003717;
}

.bg-red {
  background-color: #c01907;
}
</style>
