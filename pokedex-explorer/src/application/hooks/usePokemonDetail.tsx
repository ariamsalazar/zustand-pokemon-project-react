import { useEffect } from "react";
import { usePokemonStore } from "../../infrastructure/store/zustand/usePokemonStore";

export const usePokemonDetail = (name: string) => {
  const {
    selectedPokemon,
    loading,
    error,
    fetchPokemonDetail,
    clearSelectedPokemon,
  } = usePokemonStore();

  useEffect(() => {
    fetchPokemonDetail(name);
    return () => {
      clearSelectedPokemon();
    };
  }, [name, fetchPokemonDetail, clearSelectedPokemon]);

  return { selectedPokemon, loading, error };
};

export const usePokemonDetailById = (id: number) => {
  const {
    selectedPokemon,
    loading,
    error,
    fetchPokemonDetailById,
    clearSelectedPokemon,
  } = usePokemonStore();

  useEffect(() => {
    fetchPokemonDetailById(id);
    return () => {
      clearSelectedPokemon();
    };
  }, [id, fetchPokemonDetailById, clearSelectedPokemon]);

  return { selectedPokemon, loading, error };
};
