<template>
  <div class="mr-2 overflow-hidden dark:mr-2" style="border-radius: 0.2rem">
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.ground)">GC</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.major_ground)">MAJ GC</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.local)">LC</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.major_local)">MAJ LC</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.approach)">APP</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.major_approach)">MAJ APP</div>
    <div class="badge w-1/7" :class="genClass(props.controller.certifications.enroute)">ENR</div>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/types";

interface Props {
  controller: Controller;
}

const props = defineProps<Props>();

function genClass(cert: string): string {
  switch (cert) {
    case "cantrain":
    case "certified":
    case "solo":
    case "training":
    case "none":
      return `color-${cert} dark:color-${cert}`;
    default:
      return "color-none dark:color-none";
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.4rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  color: white;
  font-size: 0.75rem;
}

.w-1\/7 {
  width: 14.2857143%;
}
</style>

<style>
.color-certified {
  background-color: #2ecc71;
}

.color-cantrain {
  background-color: violet;
}

.color-solo {
  background-color: #3498db;
}

.color-training {
  background-color: orange;
}

.color-none {
  background-color: #6c757d;
}

.dark .dark\:color-certified {
  background-color: rgba(46, 204, 113, 0.3);
}

.dark .dark\:color-cantrain {
  background-color: rgba(238, 130, 238, 0.3);
}

.dark .dark\:color-solo {
  background-color: rgba(52, 152, 219, 0.6);
}

.dark .dark\:color-training {
  background-color: rgba(255, 165, 0, 0.5);
}

.dark .dark\:color-none {
  background-color: rgba(108, 117, 125, 0.2);
}
</style>
