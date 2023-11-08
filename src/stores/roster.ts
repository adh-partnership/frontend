import { defineStore } from "pinia";

import { CertificationItem, Controller } from "@/types";
import { ZDVAPI } from "@/utils/api";

interface RosterState {
  controllers: Controller[];
  certifications: CertificationItem[];
  fetching: boolean;
  hasFetched: boolean;
  fetched: Date;
  lastRoster: string;
}

const useRosterStore = defineStore("roster", {
  state: () =>
    ({
      controllers: [],
      certifications: [],
      fetching: false,
      hasFetched: false,
      fetched: new Date(),
      lastRoster: "Roster",
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
    getActiveRoster: (state) => {
      return state.controllers.filter((c) => c.controller_type !== "none");
    },
    getInactiveRoster: (state) => {
      return state.controllers.filter((c) => c.controller_type === "none");
    },
    getCertification: (state) => (name: string) => {
      return state.certifications.find((c) => c.name === name);
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
        const { data } = await ZDVAPI.get("/v1/user/all");
        this.controllers = data.sort((a: Controller, b: Controller) => a.last_name.localeCompare(b.last_name));
      } catch (e) {
        this.controllers = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
        this.fetched = new Date();
      }
    },
    async fetchCertifications() {
      try {
        const { data } = await ZDVAPI.get("/v1/certifications");
        this.certifications = data;
      } catch (e) {
        this.certifications = [];
      }
    },
  },
});

export default useRosterStore;
