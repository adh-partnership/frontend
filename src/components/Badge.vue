<template>
  <div
    class="px-4 h-6 w-fit rounded-full text-sm font-semibold flex items-center cursor-pointer"
    :class="`${props.backgroundColor} ${props.textColor}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  backgroundColor?: string;
  textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: "bg-gray-200",
  textColor: "text-gray-800",
});
</script>
