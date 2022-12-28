<template>
  <div
    class="rounded-md break-words mb-5 p-1 shadow-sm bg-neutral-200 dark:bg-black-deep transition hover:-translate-y-2"
  >
    <div class="flex-auto p-2">
      <div>
        <h2 class="mb-0">{{ props.event.title }}</h2>
        <div class="grid md:grid-cols-3">
          <p class="m-0 mr-3"><i class="fa-solid fa-calendar"></i> {{ localDate(props.event.start_date) }}</p>
          <p class="m-0 md:col-span-2">
            <i class="fa-solid fa-clock mr-2"></i
            >{{
              new Date(props.event.start_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
            <span class="italic">
              ({{ twoDigit(new Date(props.event.start_date).getUTCHours().toString()) }}:{{
                twoDigit(new Date(props.event.start_date).getMinutes().toString())
              }}z)
            </span>
            <i class="fa-solid fa-arrow-right ml-1 mr-1"></i>
            {{
              new Date(props.event.end_date).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
            <span class="italic">
              ({{ twoDigit(new Date(props.event.end_date).getUTCHours().toString()) }}:{{
                twoDigit(new Date(props.event.end_date).getMinutes().toString())
              }}z)
            </span>
          </p>
        </div>
      </div>
    </div>
    <img class="max-w-10 h-auto" :src="props.event.banner" :alt="props.event.title" />
  </div>
</template>

<script setup lang="ts">
import type { Event } from "@/types";

type Props = {
  event: Event;
};

const localDate = (s: string): string => {
  const dt = new Date(s);

  return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
};

const twoDigit = (s: string): string => {
  if (s.length < 2) {
    return `0${s}`;
  }
  return s;
};

const props = defineProps<Props>();
</script>

<style scoped></style>
