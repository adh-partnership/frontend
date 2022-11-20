import { defineStore } from "pinia";

import { ZDVAPI } from "@/utils/api";

interface UserState {
  user: User | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

interface User {
  cid: number;
  first_name: string;
  last_name: string;
  operating_initials: string;
  controller_type: string;
  certifications: Certifications;
  rating: string;
  status: string;
  roles: string[];
  discord_id: string;
  created_at: string;
  updated_at: string;
}

interface Certifications {
  delivery: string;
  ground: string;
  local: string;
  approach: string;
  enroute: string;
}

const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
      fetching: false,
      hasFetched: false,
    } as UserState),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async fetchUser() {
      this.fetching = true;
      try {
        const { data } = await ZDVAPI.get("/v1/user/");
        this.user = data;
      } catch (e) {
        this.user = null;
      } finally {
        this.fetching = false;
        this.hasFetched = true;
      }
    },
  },
});

export default useUserStore;
