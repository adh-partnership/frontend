<template>
  <button :class="`wx-badge wx-badge-${props.flightCategory} ${props.slim ? 'wx-badge-slim' : ''}`" disabled>
    {{ props.flightCategory }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  flightCategory: string;
  slim?: boolean;
}>();
</script>

<style scoped lang="postcss">
.wx-badge {
  @apply text-center text-lg font-bold uppercase rounded-md px-2;
  @apply text-white;
  @apply border-1 border-white;
}

.wx-badge-slim {
  @apply text-sm py-0 px-2;
}

.wx-badge-vfr {
  @apply bg-green-700;
}

.wx-badge-mvfr {
  @apply bg-blue-900;
}

.wx-badge-ifr {
  @apply bg-red-900;
}

.wx-badge-lifr {
  @apply bg-purple-900;
}
</style>
