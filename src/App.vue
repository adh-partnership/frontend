<template>
  <PartialHeader />

  <main>
    <div class="row main-content wrapper">
      <div class="main_content col s12">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import PartialHeader from "./views/partials/PartialHeader.vue";

onMounted(() => {
  M.AutoInit();
});
</script>
