import { create } from "zustand";
import { getAddressByCep } from "@stores/services/cep.service";
import { CEP } from "@stores/models/cep.model";

interface State {
  address: CEP | null;
  loading: boolean;
  error: string | null;
  fetchAddress: (cep: string) => Promise<void>;
}

export const useAddressStore = create<State>((set) => ({
  address: null,
  loading: false,
  error: null,

  fetchAddress: async (cep) => {
    set({ loading: true, error: null });

    try {
      const response = await getAddressByCep(cep);

      if (!response) {
        set({ error: "CEP não encontrado", loading: false });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      set({
        address: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error(error)
      set({ error: "Erro ao buscar CEP", loading: false });
    }
  },
}));
