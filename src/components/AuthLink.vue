<template>
  <RouterLink v-if="display && to !== undefined" v-bind="$attrs" :to="props.to!">
    <slot />
  </RouterLink>
  <a v-else-if="display && href !== undefined" v-bind="$attrs" :href="props.href!" :target="target">
    <slot />
  </a>
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
    to?: RouteLocationRaw;
    href?: string;
    hideUnauthed?: boolean | undefined;
    auth?: boolean | undefined;
    roles?: string[];
    sameWindow?: boolean;
    rosteredController?: boolean;
  }>(),
  {
    to: undefined,
    href: undefined,
    auth: undefined,
    hideUnauthed: undefined,
    rosteredController: false,
    sameWindow: false,
    roles: () => [],
  }
);

const store = useUserStore();

const target = computed(() => {
  if (props.href && !props.sameWindow) {
    return "_blank";
  }

  return "";
});

const display = computed(() => {
  if (props.auth === undefined || !props.auth) {
    return true;
  }

  if (props.auth) {
    if (props.roles !== undefined && props.roles.length > 0) {
      return store.user !== null && props.roles.some((role) => store.user?.roles.includes(role));
    }
    if (props.rosteredController !== undefined && props.rosteredController) {
      return store.user !== null && ["home", "visitor"].includes(store.user?.controller_type);
    }

    return store.user !== null;
  }

  return store.user === null;
});
</script>

<style scoped></style>
