import { defineStore } from "pinia";

import { Event } from "@/types";
import { ZDVAPI } from "@/utils/api";

interface EventState {
  events: Event[];
  fetching: boolean;
  hasFetched: boolean;
  fetched: Date;
}

const useEventStore = defineStore("event", {
  state: () =>
    ({
      events: [],
      fetching: false,
      hasFetched: false,
      fetched: new Date(),
    } as EventState),
  getters: {
    shouldFetch: (state) => {
      if (state.hasFetched) {
        const now = new Date();
        const diff = now.getTime() - state.fetched.getTime();
        const minutes = Math.floor(diff / 60000);
        return minutes > 5;
      }
      return true;
    },
    getEvent: (state) => (id: number) => {
      return state.events.find((e) => e.id === id);
    },
    getUpcomingEvents: (state) => {
      return state.events.filter((e) => new Date(e.end_date) > new Date());
    },
    getPastEvents: (state) => {
      return state.events.filter((e) => new Date(e.end_date) >= new Date());
    },
  },
  actions: {
    updateEvent(id: number, event: Event) {
      const events = [...this.events];
      const index = events.findIndex((e) => e.id === id);
      if (index > -1) {
        events.splice(index, 1, event);
        this.events = events;
      }
    },
    async fetchEvents() {
      this.fetching = true;
      try {
        const { data } = await ZDVAPI.get("/v1/events");
        this.events = data.sort((a: Event, b: Event) => a.start_date.localeCompare(b.start_date));
      } catch (e) {
        this.events = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
        this.fetched = new Date();
      }
    },
    async fetchEvent(id: number) {
      this.fetching = true;
      try {
        const { data } = await ZDVAPI.get(`/v1/events/${id}`);
        if (this.getEvent(id) !== undefined) {
          this.getEvent(id).positions = data.positions;
          this.getEvent(id).signups = data.signups;
        } else {
          this.events.push(data);
        }
      } catch (e) {
        this.fetching = false;
      } finally {
        this.fetching = false;
      }
    },
  },
});

export default useEventStore;
