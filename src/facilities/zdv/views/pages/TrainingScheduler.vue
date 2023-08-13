<template>
  <h1 class="text-2xl">Training Scheduler</h1>

  <div class="flex justify-between pb-3">
    <button
      class="bg-colorado-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      @click="calendar?.prev()"
    >
      <i class="fa fa-arrow-left" /> Previous week
    </button>

    <button
      class="bg-colorado-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      @click="calendar?.setDate(new Date())"
    >
      This week
    </button>

    <button
      class="bg-colorado-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
      @click="calendar?.next()"
    >
      Next week <i class="fa fa-arrow-right" />
    </button>
  </div>

  <div id="calendar" style="height: 800px"></div>
</template>

<script setup lang="ts">
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import Calendar, { Options } from "@toast-ui/calendar";
import { onMounted, ref, Ref } from "vue";

const calendar: Ref<Calendar | null> = ref(null);

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
    eventView: ["time"],
  },
  theme: {
    common: {
      saturday: { color: "black" },
      today: { color: "black" },
    },
    week: {},
  },
  isReadOnly: false, // TODO conditional on facility status as trainer
  useDetailPopup: false, // TODO conditional on facility status as trainer
};

onMounted(() => {
  // eslint-disable-next-line no-new
  calendar.value = new Calendar("#calendar", options);

  calendar.value.on("selectDateTime", () => {
    // TODO open modal
  });

  calendar.value.on("clickEvent", () => {
    // TODO open modal
  });

  calendar.value.on("beforeCreateEvent", (e) => {
    if (!e.start || !e.end || !calendar.value) {
      return;
    }

    const d1 = e.start as Date;
    const newStart = new Date(d1.getTime() - d1.getTimezoneOffset() * 60_000);
    const d2 = e.end as Date;
    const newEnd = new Date(d2.getTime() - d2.getTimezoneOffset() * 60_000);

    // TODO post event to DB

    calendar.value.createEvents([
      {
        ...e,
        start: newStart,
        end: newEnd,
      },
    ]);
    calendar.value.clearGridSelections();
  });

  calendar.value.on("onBeforeUpdateEvent", () => {
    // TODO allow trainer editing
  });

  calendar.value.on("onBeforeDeleteEvent", () => {
    // TODO allow trainer editing
  });

  // TODO load events from DB
});
</script>

<style lang="scss">
#calendar {
  .toastui-calendar-week-view-day-names {
    overflow-y: hidden;
  }

  .toastui-calendar-calendar-section {
    display: none;
  }

  .toastui-calendar-popup-section-title {
    width: 425px;
  }

  .toastui-calendar-form-container .toastui-calendar-popup-section:nth-child(3) {
    display: none;
  }

  .toastui-calendar-state-section {
    display: none;
  }

  .toastui-calendar-popup-section-allday {
    display: none;
  }

  .toastui-calendar-popup-section-private {
    display: none;
  }

  .toastui-calendar-popup-date-picker {
    width: 207px;
  }

  .toastui-calendar-popup-confirm {
    background-color: green;
  }
}
</style>
