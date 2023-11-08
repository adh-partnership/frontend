<template>
  <div class="mr-2 overflow-hidden dark:mr-2 flex">
    <Badge
      v-for="(value, certification) in sortedCertifications(props.controller.certifications)"
      :key="certification"
      :background-color="genClass(value.value)"
      class="mr-2"
      >{{ value.display_name }}</Badge
    >
  </div>
</template>

<script setup lang="ts">
import type { CertificationItem, Controller } from "@/types";
import Badge from "./Badge.vue";

interface Props {
  controller: Controller;
}

const props = withDefaults(defineProps<Props>(), {});

// Sort by certification item's order property
function sortedCertifications(certs: { [key: string]: CertificationItem }): { [key: string]: CertificationItem } {
  return Object.fromEntries(
    Object.entries(certs)
      .filter(([, cert]) => !cert.hidden)
      .sort(([, a], [, b]) => a.order - b.order)
  );
}

function genClass(cert: string): string {
  switch (cert) {
    case "cantrain":
    case "certified":
    case "solo":
    case "training":
    case "none":
      return `cert-color-${cert} truncate`;
    default:
      return `cert-color-none truncate`;
  }
}
</script>

<style>
.cert-color-certified,
.color-active {
  background-color: #2ecc71;
}

.cert-color-cantrain,
.color-loa {
  background-color: violet;
}

.cert-color-solo {
  background-color: #3498db;
}

.cert-color-training,
.color-inactive {
  background-color: orange;
}

.cert-color-none {
  background-color: #d7dce0;
}
</style>
