<template>
  <div class="mr-2 overflow-hidden dark:mr-2 flex flex-wrap">
    <Badge
      v-for="(value, certification) in sortedCertifications(props.controller.certifications)"
      :key="certification"
      :background-color="genClass(value.value)"
      class="mr-2 my-1"
      >{{ value.display_name }}</Badge
    >
  </div>
</template>

<script setup lang="ts">
import type { CertificationItem, Controller } from "@/types";
import fac from "@/facility";
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
      .filter(([, cert]) => !fac.certificationsHideNone || (fac.certificationsHideNone && cert.value !== "none"))
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

.dark .cert-color-none {
  background-color: #2d3748;
  color: #687179;
}
</style>
