import { create } from "zustand";

type ProgressState = {
  progress: number;
  isLoaded: boolean;
};

type ProgressAction = {
  setProgress: (progress: number) => void;
  setIsLoaded: (condition: boolean) => void;
};

const useProgressStore = create<ProgressState & ProgressAction>((set) => ({
  progress: 0,
  isLoaded: false,
  setProgress: (progress) => set({ progress }),
  setIsLoaded: (condition) => set({ isLoaded: condition }),
}));

export default useProgressStore;
