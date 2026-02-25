import { useEffect } from "react";
import { usePokemonStore } from "../../infrastructure/store/zustand/usePokemonStore";
import { LIMIT_BY_PAGE } from "../../constant/GeneralConstant";

export const usePokemonList = (page: number) => {
  const { listPokemon, loading, error, fetchPokemonList } = usePokemonStore();

  useEffect(() => {
    const offset = (page - 1) * LIMIT_BY_PAGE;
    fetchPokemonList(LIMIT_BY_PAGE, offset);
  }, [page, fetchPokemonList]);

  return { listPokemon, loading, error };
};
