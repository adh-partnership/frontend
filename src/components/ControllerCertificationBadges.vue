<template>
  <div class="mr-2 overflow-hidden dark:mr-2" style="border-radius: 0.2rem">
    <div v-if="props.showActive" class="controller-badge" :class="genActiveClass(props.controller.status)">
      <span class="badge-text">{{ props.controller.status || "unknown" }}</span>
    </div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.ground)">GC</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.major_ground)">MAJ GC</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.local)">LC</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.major_local)">MAJ LC</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.approach)">APP</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.major_approach)">MAJ APP</div>
    <div class="controller-badge" :class="genClass(props.controller.certifications.enroute)">ENR</div>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/types";

interface Props {
  controller: Controller;
  showActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showActive: false,
});

function genClass(cert: string): string {
  let c = `w-1/7`;
  if (props.showActive) {
    c = `w-1/8`;
  }
  switch (cert) {
    case "cantrain":
    case "certified":
    case "solo":
    case "training":
    case "none":
      return `${c} color-${cert} dark:color-${cert}`;
    default:
      return `${c} color-none dark:color-none`;
  }
}

function genActiveClass(status: string): string {
  let c = `w-1/7`;
  if (props.showActive) {
    c = `w-1/8`;
  }
  switch (status) {
    case "active":
      return `${c} color-certified dark:color-certified capitalize`;
    case "inactive":
      return `${c} color-training dark:color-training capitalize`;
    case "loa":
      return `${c} color-cantrain dark:color-cantrain uppercase`;
    default:
      return `${c} color-none dark:color-none capitalize`;
  }
}
</script>

<style scoped>
.controller-badge {
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
