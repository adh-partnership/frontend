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
  <ReloadPrompt />
</template>

<script lang="ts" setup>
import Footer from "@/views/partials/Footer.vue";
import Header from "@/views/partials/Header.vue";
import ReloadPrompt from "@/components/ReloadPrompt.vue";
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
.shaded {
  background-color: rgba(0, 0, 0, 0.03);
}
.text-muted {
  color: #6c757d;
}

.w-1\/7 {
  width: 14.2857143%;
}
.w-1\/8 {
  width: 12.5%;
}
.w-1\/10 {
  width: 10%;
}
.w-3\/10 {
  width: 30%;
}
</style>

<style lang="postcss">
.btn {
  @apply flex-1 bg-colorado-red text-white hover:bg-red-900 font-bold py-2 px-4 rounded text-center;
}
.card {
  @apply shadow-lg dark:shadow-neutral-800 rounded p-4 bg-neutral-200 dark:bg-neutral-900;
}
</style>
