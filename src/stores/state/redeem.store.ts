/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormData } from "@components/form/form-schema";
import { ITEM, REDEEM } from "@stores/models/awards";
import { createRescue, findRedeemByID } from "@stores/services/redeem.service";
import { create } from "zustand";
import { useStepStore } from "./control-step.store";

interface State {
  redeemID: string | null;
  redeem: REDEEM | null;
  loading: boolean;
  error: any;
  selectedAwards: string[];
  isMultiple: boolean;
  isFormValid: boolean;
  form: FormData | null;
  loadingCreateRescue: boolean;
  errorCreateRescue: any;

  // Setters
  setRedeemID: (id: string) => void;
  setIsMultiple: (value: boolean) => void;
  setIsFormValid: (value: boolean) => void;
  setForm: (payload: FormData | null) => void;

  // Actions
  fetchRedeemByID: (id: string) => Promise<void>;
  handleSelect: (id: string) => void;
  createRescue: () => Promise<boolean>;
  resetAwards: () => void;
}

export const useRescueAwardsStore = create<State>((set, get) => ({
  redeemID: null,
  redeem: null,
  loading: true,
  error: null,
  selectedAwards: [],
  isMultiple: true,
  isFormValid: false,
  form: null,
  loadingCreateRescue: false,
  errorCreateRescue: null,

  setRedeemID: (id) => set({ redeemID: id }),
  setIsMultiple: (value) => set({ isMultiple: value }),
  setIsFormValid: (value) => set({ isFormValid: value }),
  setForm: (payload) => set({ form: payload }),

  fetchRedeemByID: async (id) => {
    set({ loading: true, error: null });
    const { handleStep } = useStepStore.getState();

    try {
      const response = await findRedeemByID(id);

      if (!response) {
        set({ error: "Resgate não encontrado", loading: false });
        return;
      }

      const sortedItems = response.data.items.sort((a: ITEM, b: ITEM) =>
        Number(a.optional) - Number(b.optional)
      );

      set({
        redeem: { ...response.data, items: sortedItems },
        loading: false,
      });
    } catch (error: any) {
      handleStep(10)
      set({ error: error, loading: false });
    }
  },

  handleSelect: (id) =>
    set((state) => ({
      selectedAwards: state.isMultiple
        ? state.selectedAwards.includes(id)
          ? state.selectedAwards.filter((item) => item !== id)
          : [...state.selectedAwards, id]
        : [id],
    })),

  resetAwards: () => set({ selectedAwards: [] }),

  createRescue: async () => {
    set({ loadingCreateRescue: true, errorCreateRescue: null });

    const { redeemID, form } = get();

    if (!redeemID || !form) {
      set({
        loadingCreateRescue: false,
        errorCreateRescue: "RedeemID ou Form não encontrado",
      });
      return false;
    }

    try {
      const response = await createRescue(redeemID, form);

      if (response?.status !== 201) {
        throw new Error("Falha ao criar resgate");
      }

      set({ loadingCreateRescue: false });

      return true;
    } catch (error: any) {
      console.error("Erro ao criar resgate:", error);
      set({
        errorCreateRescue: error.message || "Erro desconhecido",
        loadingCreateRescue: false,
      });

      return false;
    }
  },
}));
