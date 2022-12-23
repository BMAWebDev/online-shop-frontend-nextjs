// Modules
import create from "zustand";
import { persist } from "zustand/middleware";

// Types
import { IUser } from "src/types";

interface storeProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const userStore = create<storeProps>()(
  persist(
    (set) => ({
      user: null,
      setUser: (_user) => set((state) => ({ user: _user })),
    }),
    {
      name: "user-storage-next-online-shop",
    }
  )
);

export default userStore;
