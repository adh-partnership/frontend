<template>
  <h1 class="text-2xl font-bold">Resources</h1>
  <div v-if="!loaded" class="flex"><Spinner class="fill-colorado-blue" /> Loading resources...</div>
  <div v-else class="flex">
    <div class="w-1/6 mr-4 border-r border-gray-200 dark:border-gray-700">
      <ul
        id="tabs"
        class="flex flex-col -mb-px text-sm font-medium text-right"
        data-tabs-toggle="#tabContent"
        role="tablist"
      >
        <li v-for="(cat, idx) in categories" :key="idx" role="tablist">
          <button
            :id="`${cat}-tab`"
            class="inline-block p-4 rounded-l-lg"
            :class="{
              'dark:text-white light:text-colorado-blue light:bg-white': openTab !== cat,
              'text-white bg-colorado-blue': openTab === cat,
            }"
            type="button"
            @click="openTab = cat"
          >
            {{ cat }}
          </button>
        </li>
      </ul>
    </div>
    <div class="w-5/6">
      <div
        v-for="(cat, idx) in categories"
        :id="cat"
        :key="idx"
        :class="{ hidden: openTab !== cat, block: openTab === cat }"
        role="tabpanel"
        aria-labelledby="`${cat.toLowerCase()}-tab`"
      >
        <table class="w-full">
          <thead class="border-b text-lg">
            <tr>
              <th class="w-1/2 py-2 text-left">Name</th>
              <th class="w-1/4 text-center">Updated</th>
              <th class="w-1/4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="border-collapse w-full">
            <tr
              v-for="(resource, ridx) in resources
                .filter((r) => r.category === cat)
                .sort((a, b) => a.name.localeCompare(b.name))"
              :key="`${cat}-${ridx}`"
              class="cursor-pointer"
              :class="{ 'bg-slate-100 dark:bg-neutral-800': ridx % 2 }"
            >
              <td>
                <p class="mb-0 text-lg">
                  <a
                    :href="resource.url"
                    target="_blank"
                    class="text-blue-dark dark:text-blue-100 hover:dark:text-blue-600 underline hover:text-blue-dark"
                    >{{ resource.name }}</a
                  >
                </p>
              </td>
              <td class="text-center">
                {{ new Date(resource.updated_at).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" }) }}
              </td>
              <td class="text-center">
                <a :href="resource.url" target="_blank" rel="noopener noreferrer">
                  <button class="btn bg-colorado-blue text-white font-bold py-2 px-4 rounded">
                    <i class="fas fa-external-link-alt"></i>
                  </button>
                </a>
                <button
                  v-if="canEditResources()"
                  class="btn bg-yellow-400 text-white font-bold py-2 px-4 ml-2 rounded"
                  @click="editResource(resource)"
                >
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td v-if="resources.filter((r) => r.category === cat).length === 0" colspan="3" class="text-center">
                <p class="mb-0 italic">No resources found.</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table v-if="canEditResources()" class="w-full">
          <tr>
            <td colspan="3" class="border-t pt-4 font-bold">New Resource</td>
          </tr>
          <tr>
            <td colspan="2" class="pt-2">
              <input v-model="newResource.name" type="text" class="w-full bg-transparent rounded" placeholder="Name" />
            </td>

            <td colspan="1" class="text-center">
              <button
                v-if="!newResource.creating"
                class="btn bg-green-400 text-white font-bold py-2 px-4 rounded"
                @click="createResource"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button v-else class="btn bg-green-800 text-white font-bold py-2 px-4 rounded">
                <Spinner class="fill-white" />
              </button>
            </td>
          </tr>
        </table>
        <table v-if="editingResource.resource !== null && canEditResources()" class="w-full">
          <tbody class="border-collapse w-full">
            <tr>
              <td colspan="3" class="font-bold pt-4">Edit Resource</td>
            </tr>
            <tr>
              <td v-if="editingResource.saving" colspan="3" class="text-center flex flex-row items-center">
                <Spinner class="fill-colorado-blue mr-10" large /> Saving Resource...
              </td>
            </tr>

            <tr v-if="!editingResource.saving">
              <td colspan="2" class="flex flex-row items-center w-3/4">
                <div class="w-1/6">Name:</div>
                <div class="w-5/6">
                  <input
                    v-model="editingResource.resource.name"
                    type="text"
                    class="w-full bg-transparent rounded"
                    placeholder="Name"
                  />
                </div>
              </td>
              <td class="text-center">
                <button class="btn bg-green-400 text-white font-bold py-2 px-4 rounded" @click="saveResource">
                  <i class="fas fa-save"></i>
                </button>
                <button class="btn bg-red-400 text-white font-bold py-2 px-4 rounded ml-4" @click="deleteResource">
                  <i class="fas fa-trash"></i>
                </button>
                <button
                  class="btn bg-yellow-400 text-white font-bold py-2 px-4 rounded ml-4"
                  @click="editingResource.resource = null"
                >
                  <i class="fas fa-x"></i>
                </button>
              </td>
            </tr>
            <tr v-if="!editingResource.saving">
              <td colspan="2" class="flex flex-row items-center w-3/4">
                <div class="w-1/6">File:</div>
                <div class="w-5/6">
                  <input ref="file" type="file" class="w-full bg-transparent" placeholder="Name" @change="filePicked" />
                </div>
              </td>
              <td class="w-1/4 text-center">
                <button
                  class="btn bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-200"
                  :disabled="editingResource.file === null"
                  @click="uploadResource"
                >
                  <i class="fas fa-upload"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API, ZDVAPI } from "@/utils/api";
import { hasRole, isAuthenticated } from "@/utils/auth";
import { onMounted, ref, Ref } from "vue";
import type { Resource } from "@/types";
import Spinner from "@/components/Spinner.vue";
import { useRouter } from "vue-router";

const newResource = ref({
  name: "",
  creating: false,
});
const editingResource = ref({
  resource: null as Resource | null,
  file: null as File | null,
  saving: false,
});
const loaded = ref(true);
const categories = ["SOPs", "LOAs", "VRC", "vSTARS", "vERAM", "vATIS", "Misc"];
const openTab: Ref<string | null> = ref(categories[0]);
const router = useRouter();
const resources: Ref<Resource[]> = ref([]);

const updateResources = async (): Promise<void> => {
  try {
    const { data } = await ZDVAPI.get("/v1/storage/");
    resources.value = data;
  } catch (err) {
    // I can't really be asked to try and recover from this...
    router.push({ name: "ErrorCrash" });
  } finally {
    loaded.value = true;
  }
};

const deleteResource = async (): Promise<void> => {
  if (editingResource.value.resource === null) return;

  try {
    await API.deleteResource(editingResource.value.resource);
    updateResources();
    editingResource.value.resource = null;
  } catch (err) {
    // I can't really be asked to try and recover from this...
    router.push({ name: "ErrorCrash" });
  } finally {
    editingResource.value.saving = false;
  }
};

const saveResource = async (): Promise<void> => {
  try {
    editingResource.value.saving = true;
    await API.createOrUpdateResource(editingResource.value.resource as Resource);
    updateResources();
  } catch (err) {
    // I can't really be asked to try and recover from this...
    router.push({ name: "ErrorCrash" });
  } finally {
    editingResource.value.saving = false;
    editingResource.value.resource = null;
  }
};

const editResource = (resource: Resource): void => {
  editingResource.value.resource = { ...resource } as Resource;
  editingResource.value.file = null;
  editingResource.value.saving = false;
};

const uploadResource = async (): Promise<void> => {
  editingResource.value.saving = true;
  try {
    await API.uploadResource(editingResource.value.resource as Resource, editingResource.value.file as File);
  } catch (err) {
    // I can't really be asked to try and recover from this...
    router.push({ name: "ErrorCrash" });
  } finally {
    editingResource.value.saving = false;
    editingResource.value.resource = null;
    updateResources();
  }
};

const filePicked = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  if (target.files === null) return;
  editingResource.value.file = target.files[0];
};

const createResource = async (): Promise<void> => {
  newResource.value.creating = true;
  API.createOrUpdateResource({
    name: newResource.value.name,
    category: openTab.value,
    description: "",
  } as Resource).then((resource) => {
    updateResources();
    editResource(resource);
    newResource.value.name = "";
    newResource.value.creating = false;
  });
};

const canEditResources = (): boolean => {
  return isAuthenticated() && hasRole(["atm", "datm", "ta", "ec", "fe", "wm"]);
};

onMounted(() => {
  updateResources();
});
</script>
