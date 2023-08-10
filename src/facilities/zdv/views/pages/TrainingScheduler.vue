<template>
  <h2>Training Scheduler</h2>
  <div id="calendar" style="height: 800px"></div>
</template>

<script setup lang="ts">
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Calendar, { Options } from "@toast-ui/calendar";
import { onMounted } from "vue";

onMounted(() => {
  const options: Options = {
    usageStatistics: false,
    defaultView: "week",
    timezone: {
      zones: [
        {
          timezoneName: "Zulu",
          displayLabel: "Zulu",
        },
      ],
    },
    calendars: [
      {
        id: "schedule",
        name: "Schedule",
      },
    ],
  };
  // eslint-disable-next-line no-new
  const calendar = new Calendar("#calendar", options);
  calendar.createEvents([
    {
      id: "event1",
      calendarId: "schedule",
      title: "Foo",
      start: "",
      end: "",
    },
  ]);
});
</script>
