"use client";

import Loader from "@/components/loader";
import Description from "@/components/pokemon/description";
import EncounterAreas from "@/components/pokemon/encounter-areas";
import Evolutions from "@/components/pokemon/evolutions";
import Moves from "@/components/pokemon/moves";
import { useRouteStore } from "@/store/use-route-store";
import {
  ChainLink,
  EvolutionClient,
  LocationAreaEncounter,
  Move,
  MoveClient,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
} from "pokenode-ts";
import { useEffect, useState } from "react";

interface Props {
  params: {
    pokeId: string;
  };
}

export default function PokemonSlugPage({ params }: Props) {
  const { footerRoute } = useRouteStore();

  const [isLoadingDescription, setIsLoadingDescription] =
    useState<boolean>(false);
  const [isLoadingEvolutions, setIsLoadingEvolutions] =
    useState<boolean>(false);
  const [isLoadingMoves, setIsLoadingMoves] = useState<boolean>(false);
  const [isLoadingEncAreas, setIsLoadingEncAreas] = useState<boolean>(false);

  const [pokeDetail, setPokeDetail] = useState<Pokemon>();
  const [pokeSpecies, setPokeSpecies] = useState<PokemonSpecies>();
  const [pokeEvoNames, setPokeEvoNames] = useState<string[]>([]);

  const [pokeEvolutions, setPokeEvolutions] = useState<Pokemon[]>([]);
  const [pokeMoves, setPokeMoves] = useState<Move[]>([]);
  const [pokeEncAreas, setPokeEncAreas] = useState<LocationAreaEncounter[]>([]);

  useEffect(() => {
    async function fetchPokeDetail(id: number) {
      try {
        setIsLoadingDescription(true);
        setIsLoadingEvolutions(true);
        setIsLoadingMoves(true);
        setIsLoadingEncAreas(true);

        const api = new PokemonClient();
        const poke = await api.getPokemonById(id);
        setPokeDetail(poke);
      } catch (error) {
        console.log("FETCH_POKE_DETAIL", error);
      } finally {
        setIsLoadingDescription(false);
      }
    }
    fetchPokeDetail(Number(params.pokeId));
  }, [params.pokeId]);

  useEffect(() => {
    async function fetchPokeSpecies() {
      try {
        const api = new PokemonClient();
        const poke = await api.getPokemonSpeciesById(
          Number(pokeDetail!.species.url.split("/")[6]),
        );
        console.log(poke)
        setPokeSpecies(poke);
      } catch (error) {
        console.log("FETCH_POKE_SPECIES", error);
      }
    }
    if (pokeDetail) {
      fetchPokeSpecies();
    }
  }, [params.pokeId, pokeDetail]);

  useEffect(() => {
    async function fetchEvolutions() {
      try {
        const api = new EvolutionClient();
        const evoChain = await api.getEvolutionChainById(
          Number(pokeSpecies!.evolution_chain.url.split("/")[6]),
        );

        const getAllSpeciesNames = (chain: ChainLink) => {
          let names = [chain.species.name];

          chain.evolves_to.forEach((evolution) => {
            names = names.concat(getAllSpeciesNames(evolution));
          });
          return names;
        };

        setPokeEvoNames(getAllSpeciesNames(evoChain.chain));
      } catch (error) {
        console.log("FETCH_EVOLUTIONS", error);
      }
    }

    if (pokeSpecies) {
      fetchEvolutions();
    }
  }, [pokeSpecies]);

  useEffect(() => {
    async function fetchPokeEvoDetail(names: string[]) {
      try {
        const api = new PokemonClient();
        const pokePromise = names.map((name) => api.getPokemonByName(name));
        const pokes = await Promise.all(pokePromise);
        setPokeEvolutions(pokes);
      } catch (error) {
        console.log("FETCH_POKE_EVO_DETAIL", error);
      } finally {
        setIsLoadingEvolutions(false);
      }
    }
    if (pokeSpecies) {
      fetchPokeEvoDetail(pokeEvoNames);
    }
  }, [pokeSpecies, pokeEvoNames]);

  useEffect(() => {
    async function fetchMoves(moveNames: string[]) {
      try {
        const api = new MoveClient();
        const promiseMoves = moveNames.map((m) => api.getMoveByName(m));
        const moves = await Promise.all(promiseMoves);
        setPokeMoves(moves);
      } catch (error) {
        console.log("FETCH_MOVES", error);
      } finally {
        setIsLoadingMoves(false);
      }
    }
    if (pokeDetail) {
      const moveName = pokeDetail.moves.map((m) => m.move.name);
      fetchMoves(moveName);
    }
  }, [pokeDetail]);

  useEffect(() => {
    async function fetchEncounterAreas(id: number) {
      try {
        const api = new PokemonClient();
        const areas = await api.getPokemonLocationAreaById(id);
        setPokeEncAreas(areas);
      } catch (error) {
        console.log("FETCH_ENCOUNTER_AREAS", error);
      } finally {
        setIsLoadingEncAreas(false);
      }
    }
    if (pokeDetail) {
      fetchEncounterAreas(Number(params.pokeId));
    }
  }, [pokeDetail, params.pokeId]);

  return (
    <>
      {footerRoute === "description" &&
        (isLoadingDescription ? (
          <Loader />
        ) : (
          pokeDetail &&
          pokeSpecies && (
            <Description pokeDetail={pokeDetail} pokeSpecies={pokeSpecies} />
          )
        ))}
      {footerRoute === "evolutions" && (
        <Evolutions
          pokeEvolutions={pokeEvolutions}
          isLoading={isLoadingEvolutions}
        />
      )}
      {footerRoute === "moves" && (
        <Moves pokeMoves={pokeMoves} isLoading={isLoadingMoves} />
      )}
      {footerRoute === "encounter areas" && (
        <EncounterAreas
          pokeEncAreas={pokeEncAreas}
          isLoading={isLoadingEncAreas}
        />
      )}
    </>
  );
}
