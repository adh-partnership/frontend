<template>
  <h2>Training Scheduler</h2>
  <div id="calendar" style="height: 100vh"></div>
</template>

<script setup lang="ts">
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import Calendar, { Options } from "@toast-ui/calendar";
import { onMounted } from "vue";

onMounted(() => {
  const options: Options = {
    usageStatistics: false,
    defaultView: "week",
    timezone: {
      zones: [
        {
          timezoneName: "UTC",
          displayLabel: "UTC",
          tooltip: "UTC",
        },
      ],
    },
    calendars: [
      {
        id: "schedule",
        name: "Schedule",
      },
    ],
    week: {
      taskView: false,
    },
    theme: {
      common: {
        saturday: { color: "black" },
        holiday: { color: "black" },
        today: { color: "black" },
      },
      week: {},
    },
    isReadOnly: false,
    useFormPopup: true,
    useDetailPopup: true,
  };
  // eslint-disable-next-line no-new
  const calendar = new Calendar("#calendar", options);

  calendar.on("beforeCreateEvent", (e) => {
    if (e.isAllday || !e.start || !e.end) {
      return;
    }

    const d1 = e.start as Date;
    const newStart = new Date(d1.getTime() - d1.getTimezoneOffset() * 60_000);
    const d2 = e.end as Date;
    const newEnd = new Date(d2.getTime() - d2.getTimezoneOffset() * 60_000);
    calendar.createEvents([
      {
        ...e,
        start: newStart,
        end: newEnd,
      },
    ]);
    calendar.clearGridSelections();
  });
});
</script>
