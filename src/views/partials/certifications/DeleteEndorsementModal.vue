<template>
  <button
    type="button"
    class="text-white bg-white hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-900 focus:z-10 dark:bg-red-700 dark:text-white dark:border-red-500 dark:hover:text-red-100 dark:hover:bg-red-600 dark:focus:ring-red-600"
    @click="toggleEndorsementModal"
  >
    <i class="fas fa-xmark mr-2"></i>Delete
  </button>
  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70">
    <div class="relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/3">
      <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white m-0">Delete Endorsement</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="toggleEndorsementModal()"
        >
          <i class="fas fa-xmark w-4"></i>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <p class="text-lg">Caution! This action is irreversible. Are you sure you want to delete this endorsement?</p>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <button
          type="button"
          class="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
          @click="deleteEndorsement()"
        >
          Delete
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="toggleEndorsementModal()"
        >
          Cancel
        </button>
      </div>
      <alert v-if="error != null" type="error">
        <b>Error</b>: There was an error deleting the endorsement, recheck your form values and try again. {{ error }}
      </alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/api";

const router = useRouter();
const isOpen = ref(false);
const roster = useRosterStore();
const error = ref();
const emit = defineEmits(["close"]);

type Props = {
  name: string;
};
const props = defineProps<Props>();

const toggleEndorsementModal = (): void => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    emit("close");
  }
  window.scrollTo(0, 0);
  (document.activeElement as HTMLElement).blur();
};

const deleteEndorsement = async (): Promise<void> => {
  try {
    const result = await ZDVAPI.delete(`/v1/certifications/${props.name}`);
    if (result.status === 204) {
      await roster.fetchCertifications();
      await router.push(`/certifications/`);
      toggleEndorsementModal();
    }
  } catch (err) {
    error.value = err;
  }
};
</script>

<style scoped></style>
