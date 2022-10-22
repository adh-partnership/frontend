<template>
  <div class="container rounded-md w-full p-3" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  type: "success" | "error" | "warning" | "info";
}>();

const classes = computed(() => {
  return `alert-${props.type}`;
});
</script>

<style scoped lang="postcss">
.alert-error {
  @apply bg-red-200 text-red-900 border-red-900;
}
.alert-info {
  @apply bg-blue-200 text-blue-900 border-blue-900;
}
.alert-success {
  @apply bg-green-100 text-green-900 border-green-900;
}
.alert-warning {
  @apply bg-yellow-200 text-yellow-900 border-yellow-900;
}
</style>
