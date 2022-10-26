<template>
  <div>
    <div>
      <div v-if="!loaded" class="flex justify-center">
        <div class="spin rounded-full h-32 w-32 border-b-8 border-gray-900 dark:border-colorado-blue"></div>
      </div>
      <div v-else-if="loaded && error" class="flex justify-center">
        <Alert type="error"> <b>Error</b>: There was an error loading the training notes for this controller.</Alert>
      </div>
      <div v-else class="flex justify-center flex-col">
        <div class="flex w-full">
          <div class="w-4/5">
            <h2>Training Notes</h2>
          </div>
          <div class="w-1/5">
            <div class="flex justify-end">
              <AuthLink
                :to="{ name: 'NewTrainingNote', params: { cid: props.controller.cid } }"
                class="btn bg-colorado-blue hover:bg-blue-dark"
                :auth="true"
                :role="['atm', 'datm', 'ta', 'ins', 'mtr', 'wm']"
                >New Note</AuthLink
              >
            </div>
          </div>
        </div>
        <div class="w-full">
          <table v-for="note in trainingNotes" :key="note.id" class="w-full"></table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Controller, TrainingNote } from "@/types";
import { onMounted, ref } from "vue";
import AuthLink from "@/components/AuthLink.vue";
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
