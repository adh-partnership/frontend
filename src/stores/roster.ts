import { defineStore } from "pinia";

import { Controller } from "@/types";
import { ZDVAPI } from "@/utils/axios";

interface RosterState {
  controllers: Controller[];
  fetching: boolean;
  hasFetched: boolean;
  fetched: Date;
}

const useRosterStore = defineStore("roster", {
  state: () =>
    ({
      controllers: [],
      fetching: false,
      hasFetched: false,
      fetched: new Date(),
    } as RosterState),
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
    getController: (state) => (cid: number) => {
      return state.controllers.find((c) => c.cid === cid);
    },
  },
  actions: {
    updateController(cid: number, controller: Controller) {
      // Dirty hack.. but it works
      const controllers = [...this.controllers];
      const index = controllers.findIndex((c) => c.cid === cid);
      if (index > -1) {
        controllers.splice(index, 1, controller);
        this.controllers = controllers;
      }
    },
    async fetchRoster() {
      this.fetching = true;
      try {
        const { data } = await ZDVAPI.get("/v1/user/roster");
        this.controllers = data;
      } catch (e) {
        this.controllers = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
        this.fetched = new Date();
      }
    },
  },
});

export default useRosterStore;