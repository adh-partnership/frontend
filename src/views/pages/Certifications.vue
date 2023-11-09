<template>
  <div>
    <div class="flex w-full">
      <div class="flex">
        <h1 class="text-2xl">Certifications</h1>
        <button
          v-if="modifiedState == 1"
          class="btn flex-none mt-1 w-24 h-8 bg-emerald-500 hover:bg-emerald-800 text-white font-bold py-1 px-2 ml-2 rounded"
          type="button"
          @click="saveOrder"
        >
          <i class="fa fa-save"></i> Save
        </button>
        <button
          v-if="modifiedState == -1"
          class="btn flex-none mt-1 w-24 h-8 bg-red-500 text-white font-bold py-1 px-2 ml-2 rounded"
          type="button"
          disabled
        >
          Save Failed
        </button>
      </div>
    </div>
    <div class="pb-1">
      <p>
        This page is meant to create all Tier 2, Tier 1 and eventually Event Endorsements. Given that Unrestrict
        positions are no longer restrictable, there is no reason to certify on them so they will no longer display on
        the roster.... unless you create them here.
      </p>
    </div>
    <hr />
    <Sortable
      :key="JSON.stringify(certifications)"
      :list="certifications"
      item-key="id"
      tag="div"
      :options="options"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="draggable flex justify-between items-center">
          <div :key="element.id" class="flex">
            {{ element.name }}
            <span v-if="element.hidden"><i class="fa-solid fa-ghost ml-2"></i></span>
          </div>
          <div class="flex">
            <button
              aria-label="Edit"
              class="p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
              @click="editCertification(element)"
            >
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </template>
    </Sortable>
    <hr />
    <div class="flex flex-row w-full pt-3">
      <h1 v-if="editState == 0" class="text-xl">Create New Certification</h1>
      <h1 v-if="editState == 1" class="text-xl">Edit Certification</h1>
    </div>
    <div>
      <p>
        Create or edit a new certification. To edit, click the <i class="fas fa-edit"></i> icon on the right of the
        endorsement above. Use the Cancel button to clear the form.
      </p>
    </div>
    <div class="p-6 space-y-6">
      <div class="relative z-0 mb-2 w-full group">
        <input
          id="cert-name"
          v-model="newCertification.name"
          type="text"
          class="block px-1 pb-1 pt-4 pl-2 w-full font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="cert-name"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Name
        </label>
      </div>
      <div class="relative z-0 mb-2 w-full group">
        <input
          id="cert-display-name"
          v-model="newCertification.display_name"
          type="text"
          class="block px-1 pb-1 pl-2 pt-4 w-full font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="cert-display-name"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Display Name
        </label>
      </div>
      <div class="relative z-0 mb-2 w-full group">
        <select
          id="cert-hidden"
          v-model="newCertification.hidden"
          class="block px-1 pb-1 pl-2 pt-4 w-full text-lg font-bold rounded-md text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer focus:dark:bg-black-deep"
        >
          <option :value="false" class="dark:bg-black-deep">Visible</option>
          <option :value="true" class="dark:bg-black-deep">Hidden</option>
        </select>
        <label
          for="cert-hidden"
          class="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black-light px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:text-sm peer-placeholder-shown:text-lg peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >Hidden</label
        >
      </div>
      <div class="flex items-center space-x-2 rounded-b">
        <button
          v-if="editState == 0 || editState == 1"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="saveCertification(newCertification)"
        >
          <span v-if="editState == 0">Create</span>
          <span v-if="editState == 1">Save</span>
        </button>
        <button
          v-else-if="editState == 2"
          type="button"
          class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled
        >
          Saving...
        </button>
        <button
          v-else-if="editState == -1"
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          disabled
        >
          Save Failed!
        </button>
        <button
          type="button"
          class="text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="cancelCertification"
        >
          Cancel
        </button>
        <DeleteEndorsementModal v-if="editState == 1" :name="editName" @close="load" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, nextTick, onMounted, toRaw } from "vue";
import type { SortableOptions, SortableEvent } from "sortablejs";
import { CertificationItem } from "@/types";
import { Sortable } from "sortablejs-vue3";
import useRosterStore from "@/stores/roster";
import { ZDVAPI } from "@/utils/api";
import DeleteEndorsementModal from "../partials/certifications/DeleteEndorsementModal.vue";

const rosterStore = useRosterStore();
const certifications: Ref<CertificationItem[]> = ref([]);
const newCertification: Ref<CertificationItem> = ref({
  name: "",
  id: 0,
  order: 0,
  display_name: "",
  hidden: false,
  value: "",
});
const editState = ref(0);
const editName = ref("");
const modifiedState = ref(0);
const options: Ref<SortableOptions> = ref({
  draggable: ".draggable",
  animation: 150,
  ghostClass: "ghost",
  dragClass: "drag",
  scroll: true,
  forceFallback: true,
  bubbleScroll: true,
});

const moveItemInArray = <T>(array: T[], from: number, to: number): void => {
  const item = array.splice(from, 1)[0];
  nextTick(() => array.splice(to, 0, item));
};

const onEnd = (event: SortableEvent): void => {
  const { oldIndex, newIndex } = event;
  if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) {
    return;
  }
  moveItemInArray(certifications.value, oldIndex, newIndex);
  modifiedState.value = 1;
};

const cancelCertification = (): void => {
  newCertification.value = {
    name: "",
    id: 0,
    order: 0,
    display_name: "",
    hidden: false,
    value: "",
  };
  editName.value = "";
  editState.value = 0;
};

const editCertification = (cert: CertificationItem): void => {
  newCertification.value = structuredClone(toRaw(cert));
  editName.value = cert.name;
  editState.value = 1;
};

const saveCertification = async (cert: CertificationItem): Promise<void> => {
  if (editState.value !== 0 && editState.value !== 1) {
    return;
  }
  const state = editState.value;
  editState.value = 2;
  try {
    if (state === 1) {
      await ZDVAPI.put(`/v1/certifications/${editName.value}`, cert);
    } else {
      await ZDVAPI.post("/v1/certifications", cert);
    }
    await rosterStore.fetchCertifications();
    certifications.value = structuredClone(toRaw(rosterStore.certifications));
    cancelCertification();
  } catch (error) {
    editState.value = -1;
    setTimeout(() => {
      editState.value = 0;
    }, 10000);
  }
};

const saveOrder = async (): Promise<void> => {
  const data = [];
  for (let i = 0; i < certifications.value.length; i += 1) {
    data.push(certifications.value[i].id);
  }
  try {
    await ZDVAPI.patch("/v1/certifications/bulk-order", data);
    modifiedState.value = 0;
    await rosterStore.fetchCertifications();
  } catch (error) {
    modifiedState.value = -1;
    setTimeout(() => {
      modifiedState.value = 0;
    }, 5000);
  }
};

function sortedCertifications(certs: CertificationItem[]): CertificationItem[] {
  return certs.sort((a, b) => a.order - b.order);
}

const load = async (): Promise<void> => {
  await rosterStore.fetchCertifications();
  // We don't want to mess with store data, so clone it... we'll update store on save
  certifications.value = sortedCertifications(structuredClone(toRaw(rosterStore.certifications)));
  cancelCertification();
};

onMounted((): void => {
  load();
});
</script>

<style scoped>
.draggable {
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  cursor: move;
}

.ghost {
  opacity: 0.5;
  border: 1px dashed #ccc;
}
</style>
