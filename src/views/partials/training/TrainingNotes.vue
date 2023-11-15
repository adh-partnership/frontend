<template>
  <div>
    <div>
      <div v-if="!loaded || override" class="flex justify-center">
        <Spinner large class="fill-colorado-blue" />
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
              <button v-if="display" class="btn" :class="primaryHover" @click="openTrainingNote(null)">New Note</button>
            </div>
          </div>
        </div>
        <div class="w-full">
          <table class="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Position</th>
                <th>Type</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="note in notes"
                :key="note.id"
                class="border-b border-gray-200 text-center"
                :class="{
                  'no-show': note.type === 'no-show',
                  ots: note.type === 'live-ots' || note.type === 'simulation-ots',
                }"
              >
                <td>{{ note.id }}</td>
                <td>{{ note.position }}</td>
                <td class="capitalize">{{ convertType(note.type) }}</td>
                <td>{{ getUTCDate(note.session_date) }}</td>
                <td>{{ note.duration }}</td>
                <td>{{ note.instructor?.first_name }} {{ note.instructor?.last_name }}</td>
                <td>
                  <RouterLink :to="{ name: 'TrainingNoteView', params: { cid: controller.cid, id: note.id } }">
                    <button class="text-white py-1.5 px-1.5 rounded-l-lg" :class="primaryHover">
                      <i class="fa-solid fa-search" />
                    </button>
                  </RouterLink>
                  <button
                    class="bg-colorado-yellow hover:bg-yellow-500 disabled:bg-yellow-600 disabled:cursor-not-allowed text-black py-1.5 px-1.5 rounded-r-lg"
                    :disabled="note.instructor_id !== store.user?.cid"
                    @click="openTrainingNote(note)"
                  >
                    <i class="fa-solid fa-pen-to-square" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { Controller, TrainingNote } from "@/types";
import { getUTCDate } from "@/utils/helpers";
import { primaryHover } from "@/utils/colors";
import type { Ref } from "vue";
import Spinner from "@/components/Spinner.vue";
import { useRouter } from "vue-router";
import useTrainingStore from "@/stores/training";
import useUserStore from "@/stores/users";
import { ZDVAPI } from "@/utils/api";

const override = ref(false); // For dev purposes
const loaded = ref(false);
const error = ref(false);
const trainingNotes: Ref<TrainingNote[]> = ref([]);

const props = defineProps<{
  controller: Controller;
}>();

const store = useUserStore();
const trainingStore = useTrainingStore();
const router = useRouter();

const notes = computed(() =>
  [...trainingNotes.value].sort((a, b) => Date.parse(b.session_date) - Date.parse(a.session_date))
);

const display = computed(() => {
  return (
    store.user !== null && ["atm", "datm", "ta", "wm", "mtr", "ins"].some((role) => store.user?.roles.includes(role))
  );
});

const convertType = (t: string): string => {
  switch (t) {
    case "live-ots":
      return "Live OTS";
    case "simulation-ots":
      return "Simulation OTS";
    case "no-show":
      return "No Show";
    default:
      return t;
  }
};

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

const openTrainingNote = (note: TrainingNote | null): void => {
  if (note === null) {
    trainingStore.clearCurrentTrainingNote();
  } else {
    trainingStore.currentTrainingNote = note;
    trainingStore.copyToForm();
  }
  trainingStore.student = props.controller;

  router.push({
    name: "TrainingNote",
    params: {
      cid: props.controller.cid,
      id: trainingStore.currentTrainingNote.id,
    },
  });
};
</script>

<style scoped>
.no-show {
  background-color: rgba(255, 0, 0, 0.1);
}

.ots {
  background-color: rgba(0, 0, 255, 0.1);
}
</style>
