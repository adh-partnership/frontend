<template>
  <RouterLink v-if="display" v-bind="$attrs" :to="props.to">
    <slot />
  </RouterLink>
  <div v-else-if="!display && !hideUnauthed">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { RouteLocationRaw } from "vue-router";

import useUserStore from "@/stores/users";

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw;
    hideUnauthed?: boolean | undefined;
    auth?: boolean | undefined;
    roles?: string[];
  }>(),
  {
    auth: undefined,
    hideUnauthed: undefined,
    roles: () => [],
  }
);

const store = useUserStore();
const display = computed(() => {
  console.log(`Link: ${JSON.stringify(props.to)}, Auth: ${props.auth}, Roles: ${props.roles}`);
  if (props.auth === undefined || !props.auth) {
    return true;
  }

  if (props.auth) {
    if (props.roles !== undefined && props.roles.length > 0) {
      return store.user !== null && props.roles.some((role) => store.user?.roles.includes(role));
    }

    return store.user !== null;
  }

  return store.user === null;
});
</script>

<style scoped></style>
