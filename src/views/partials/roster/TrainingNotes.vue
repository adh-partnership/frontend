<template>
  <div>
    <div>
      <div v-if="!loaded" class="flex justify-center">
        <div class="spin rounded-full h-32 w-32 border-b-8 border-gray-900 dark:border-colorado-blue"></div>
      </div>
      <div v-else-if="loaded && error" class="flex justify-center">
        <Alert type="error"> <b>Error</b>: There was an error loading the training notes for this controller.</Alert>
      </div>
      <div v-else class="flex justify-center">Success!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Controller, TrainingNote } from "@/types";
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { ZDVAPI } from "@/utils/axios";

const loaded = ref(false);
const error = ref(false);
const trainingNotes: Ref<TrainingNote[]> = ref([]);

const props = defineProps<{
  controller: Controller;
}>();

onMounted(async () => {
  try {
    const result = await ZDVAPI.get(`/v1/training/${props.controller.cid}`);
    if (result.status === 200) {
      trainingNotes.value = result.data;
    } else {
      throw new Error("Error loading training notes");
    }
  } catch (e) {
    error.value = true;
  } finally {
    loaded.value = true;
  }
});
</script>

<style scoped>
.spin {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
