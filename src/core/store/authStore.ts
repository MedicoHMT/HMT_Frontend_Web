import type { CurrentUser } from "../type/types";

type Setter = {
  setUser: (u: CurrentUser | null) => void;
  setAccessToken: (t: string | null) => void;
};

const store: Partial<Setter> = {};

export const AuthStore = {
  register(s: Setter) {
    store.setUser = s.setUser;
    store.setAccessToken = s.setAccessToken;
  },
  setCurrentUser(user: CurrentUser | null) {
    store.setUser?.(user ?? null);
  },
  setAccessToken(token: string | null) {
    store.setAccessToken?.(token ?? null);
  },
  clear() {
    store.setUser?.(null);
    store.setAccessToken?.(null);
  }
};
