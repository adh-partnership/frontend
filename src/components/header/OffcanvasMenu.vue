<template>
  <div class="fixed top-0 left-0 w-screen h-screen opacity-0 invisible z-50 transition-all">
    <div class="top-0 left-0 w-full h-full absolute bg-black bg-opacity-80 content-['']" @click="$emit('toggle')"></div>
    <div
      class="mobile-menu-inner relative w-[400px] max-w-[80%] h-full text-left bg-white -translate-x-full transition-all"
    >
      <button
        aria-label="Settings"
        class="absolute top-0 left-full w-16 h-16 text-4xl text-heading-light hover:text-primary bg-white group"
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import links from "./links";
import OffcanvasMenuItem from "./OffcanvasMenuItem.vue";

defineEmits(["toggle"]);
</script>

<style scoped></style>
