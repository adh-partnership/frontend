import { defineStore } from "pinia";

import { ZDVAPI } from "@/utils/axios";

const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    fetching: false,
    hasFetched: false,
  }),
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
