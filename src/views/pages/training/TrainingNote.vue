<template>
  <div v-if="loading">
    <Spinner large class="fill-colorado-blue" />
  </div>
  <div v-else-if="failed">
    <Alert type="error"> <b>Error</b>: There was an error loading the desired training note. </Alert>
  </div>
  <div v-else>
    <ControllerHeader :controller="controller"></ControllerHeader>
    <div class="flex w-full">
      <h2>Training Note</h2>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>ID</b>
      </div>
      <div class="w-4/5">
        {{ note.id }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Position</b>
      </div>
      <div class="w-4/5">
        {{ note.position }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Session Type</b>
      </div>
      <div class="w-4/5">
        {{ note.type }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Session Date</b>
      </div>
      <div class="w-4/5">
        {{ new Date(note.session_date).toDateString() }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Duration</b>
      </div>
      <div class="w-4/5">
        {{ note.duration }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Instructor</b>
      </div>
      <div class="w-4/5">
        {{ note.instructor?.first_name }} {{ note.instructor?.last_name }} - {{ note.instructor?.operating_initials }}
      </div>
    </div>
    <div class="flex w-full">
      <div class="w-1/5">
        <b>Comments</b>
      </div>
      <div class="w-4/5">
        {{ note.comments }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { Controller, TrainingNote } from "@/types";
import ControllerHeader from "@/components/ControllerHeader.vue";
import Spinner from "@/components/Spinner.vue";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/axios";

const rosterStore = useRosterStore();
const route = useRoute();
const router = useRouter();
const cid = parseInt(route.params.cid as string, 10);
const controller = ref(rosterStore.getController(cid) as Controller);
const loadingController = ref(true);
const loadingNote = ref(true);
const note = ref({} as TrainingNote);
const failed = ref(false);

const loading = computed(() => {
  return loadingController.value || loadingNote.value;
});

onMounted(async () => {
  if (controller.value) {
    loadingController.value = false;
  } else {
    rosterStore.fetchRoster().then(() => {
      controller.value = rosterStore.getController(cid) as Controller;

      if (controller.value === undefined) {
        router.push({ name: "NotFound" });
      } else {
        loadingController.value = false;
      }
    });
  }

  try {
    const result = await ZDVAPI.get(`/v1/training/${cid}`);
    [note.value] = result.data.filter((n: TrainingNote) => n.id === parseInt(route.params.id as string, 10));
  } catch (e) {
    failed.value = true;
  } finally {
    loadingNote.value = false;
  }
});
</script>

<style scoped></style>
