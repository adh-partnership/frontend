/* eslint-disable import/prefer-default-export */
import useUserStore from "@/stores/users";

export const hasRole = (role?: string[] | string): boolean => {
  const store = useUserStore();

  if (store.user === undefined) {
    return false;
  }

  if (role === undefined) {
    return false;
  }

  if (typeof role === "string") {
    return store.user?.roles.includes(role) || false;
  }

  return role.some((r) => store.user?.roles.includes(r)) || false;
};

export const inGroup = async (group?: string[] | string): Promise<boolean> => {
  const store = useUserStore();

  if (store.user === undefined) {
    return false;
  }

  if (group === undefined) {
    return false;
  }

  if (store.permissionGroups === null) {
    try {
      await store.fetchPermissionGroups();
    } catch (e) {
      return false;
    }
  }

  // If we failed to fetch, assume the worst.
  if (store.permissionGroups === null) {
    return false;
  }

  let g = group;
  if (typeof group === "string") {
    g = [group];
  }

  for (let i = 0; i < g.length; i += 1) {
    const roles = store.permissionGroups[g[i]];
    if (roles === undefined) {
      return false;
    }
    if (hasRole(roles)) {
      return true;
    }
  }

  return false;
};

export const isAuthenticated = (): boolean => {
  const store = useUserStore();

  return store.user !== null;
};
