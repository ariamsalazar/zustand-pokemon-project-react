import { create } from "zustand";
import type {
  IPokemon,
  IPokemonListResponse,
} from "../../../domain/entities/IPokemon";
import { PokemonRepository } from "../../adapters/PokemonRepository";
import { GetPokemonListUseCase } from "../../../application/useCases/GetPokemonListUseCase";
import {
  GetPokemonDetailUseCase,
  GetPokemonDetailUseCaseById,
} from "../../../application/useCases/GetPokemonDetailUseCase";
import {
  ERROR_FETCHING_DETAIL,
  ERROR_FETCHING_LIST,
} from "../../../constant/MessageConstant";

interface PokemonState {
  listPokemon: IPokemonListResponse | null;
  selectedPokemon: IPokemon | null;
  loading: boolean;
  error: string | null;
  fetchPokemonList: (limit: number, offset: number) => Promise<void>;
  fetchPokemonDetail: (name: string) => Promise<void>;
  fetchPokemonDetailById: (id: number) => Promise<void>;
  clearSelectedPokemon: () => void;
}

const repository = new PokemonRepository();
const getPokemonListUCase = new GetPokemonListUseCase(repository);
const getPokemonDetailUCase = new GetPokemonDetailUseCase(repository);
const getPokemonDetailByIdUCase = new GetPokemonDetailUseCaseById(repository);

export const usePokemonStore = create<PokemonState>((set) => ({
  listPokemon: null,
  selectedPokemon: null,
  loading: false,
  error: null,

  fetchPokemonList: async (limit, offset) => {
    set({ loading: true, error: null });
    try {
      const data = await getPokemonListUCase.execute(limit, offset);
      set({ loading: false, listPokemon: data });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : ERROR_FETCHING_LIST;
      set({ loading: false, error: message });
    }
  },

  fetchPokemonDetail: async (name) => {
    set({ loading: true, error: null });
    try {
      const data = await getPokemonDetailUCase.execute(name);
      set({ loading: false, selectedPokemon: data });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : ERROR_FETCHING_DETAIL;
      set({ loading: false, error: message });
    }
  },

  fetchPokemonDetailById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getPokemonDetailByIdUCase.execute(id);
      set({ loading: false, selectedPokemon: data });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : ERROR_FETCHING_DETAIL;
      set({ loading: false, error: message });
    }
  },

  clearSelectedPokemon: () => set({ selectedPokemon: null }),
}));
