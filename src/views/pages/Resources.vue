<template>
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
              v-for="(resource, ridx) in resources.filter((r) => r.category === cat)"
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
              <td class="text-center">{{ resource.updated_at }}</td>
              <td class="text-center">
                <a :href="resource.url" target="_blank" rel="noopener noreferrer">
                  <button class="btn bg-colorado-blue text-white font-bold py-2 px-4 rounded">
                    <i class="fas fa-external-link-alt"></i>
                  </button>
                </a>
                <button class="btn bg-yellow-400 text-white font-bold py-2 px-4 ml-2 rounded">
                  <i class="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td v-if="resources.filter((r) => r.category === cat).length === 0" colspan="3" class="text-center">
                <p class="mb-0 italic">No resources found.</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="pt-2">
                <input
                  v-model="newResource.name"
                  type="text"
                  class="w-full bg-transparent rounded"
                  placeholder="Name"
                />
              </td>

              <td colspan="1" class="text-center">
                <button class="btn bg-green-400 text-white font-bold py-2 px-4 rounded" @click="createResource">
                  <i class="fas fa-plus"></i>
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
import { onMounted, ref, Ref } from "vue";
import type { Resource } from "@/types";
import Spinner from "@/components/Spinner.vue";
import { useRouter } from "vue-router";

const newResource = ref({
  name: "",
  creating: false,
});
const loaded = ref(true);
const categories = ["SOPs", "LOAs", "VRC", "vSTARS", "vERAM", "vATIS", "Misc"];
const openTab: Ref<string | null> = ref(categories[0]);
const router = useRouter();
const resources: Ref<Resource[]> = ref([
  {
    name: "Test SOP",
    description: "This is a test SOP",
    category: "SOPs",
    url: "https://google.com",
    updated_at: "2021-01-01",
  },
  {
    name: "Test SOP 2",
    description: "This is a test SOP",
    category: "SOPs",
    url: "https://google.com",
    updated_at: "2021-01-01",
  },
]);

const createResource = async (): Promise<void> => {
  API.createOrUpdateResource({
    name: newResource.value.name,
    category: openTab.value,
    description: "",
  } as Resource).then(() => {
    newResource.value.name = "";
    newResource.value.creating = false;
  });
};

const updateResources = async (): Promise<void> => {
  loaded.value = false;
  try {
    const { data } = await ZDVAPI.get("/v1/storage/");
    resources.value = data;
  } catch (err) {
    console.log(err);
    // I can't really be asked to try and recover from this...
    router.push({ name: "ErrorCrash" });
  } finally {
    loaded.value = true;
  }
};

onMounted(() => {
  updateResources();
});
</script>

<style scoped></style>
