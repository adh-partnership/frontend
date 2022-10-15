/* eslint-disable import/prefer-default-export */
import useUserStore from "@/stores/users";

export const hasRole = (role: string[] | string): boolean => {
  const store = useUserStore();

  if (store.user === undefined) {
    return false;
  }

  if (typeof role === "string") {
    return store.user?.roles.includes(role) || false;
  }

  return role.some((r) => store.user?.roles.includes(r)) || false;
};

export const isAuthenticated = (): boolean => {
  const store = useUserStore();

  return store.user !== undefined;
};
