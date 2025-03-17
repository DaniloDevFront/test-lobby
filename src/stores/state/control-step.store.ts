import { create } from "zustand";
import { useRescueAwardsStore } from "./redeem.store";

interface State {
  step: number;
  handleStep: (action: number | "next" | "prev") => void;
}

export const useStepStore = create<State>((set, get) => ({
  step: 0,

  handleStep: async (action) => {
    const { createRescue } = useRescueAwardsStore.getState();

    if (action === "next") {
      if (get().step === 2) {
        const created = await createRescue()

        if (!created) {
          alert("🚨 Formulário não submetido! Não pode avançar.");
          return;
        }
      }

      set((state) => ({ step: state.step + 1 }));
    } else if (action === "prev") {
      set((state) => ({ step: Math.max(state.step - 1, 0) }));
    } else {
      set({ step: action });
    }
  },
}));
