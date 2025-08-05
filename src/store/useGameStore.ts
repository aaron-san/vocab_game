import { create } from "zustand";

type GameState = {
  // points: number;
  // addPoints: (value: number) => void;
  // resetPoints: () => void;
  completedTopics: string[];
  addCompletedTopic: (value: string) => void;
};

export const useGameStore = create<GameState>((set) => ({
  // points: 0,
  // addPoints: (value) => set((state) => ({ points: state.points + value })),
  // resetPoints: () => set({ points: 0 }),
  completedTopics: [],
  addCompletedTopic: (value) =>
    set((state) => ({ completedTopics: [...state.completedTopics, value] })),
}));
