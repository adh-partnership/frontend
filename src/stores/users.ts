import { defineStore } from "pinia";

import { PermissionGroups } from "@/types";
import { ZDVAPI } from "@/utils/api";

interface UserState {
  user: User | null;
  permissionGroups: PermissionGroups | null;
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
  certifications: { [key: string]: string };
  rating: string;
  status: string;
  roles: string[];
  discord_id: string;
  created_at: string;
  updated_at: string;
}

const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
      permissionGroups: null,
      fetching: false,
      hasFetched: false,
    }) as UserState,
  getters: {
    isLoggedIn: (state) => !!state.user,
    getPermissionGroups: (state) => state.permissionGroups,
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
    async fetchPermissionGroups() {
      try {
        const { data } = await ZDVAPI.get("/v1/authorization/groups");
        this.permissionGroups = data;
      } catch (e) {
        // Worst case scenario only vatusa recognized staff roles will be allowed.
        this.permissionGroups = {
          admin: ["atm", "datm", "wm"],
          events: ["ec"],
          fac: ["fe"],
          files: ["atm", "datm", "wm", "ta"],
          training: ["ta", "ins", "mtr"],
          web: ["wm"],
        };
      }
    },
  },
});

export default useUserStore;
