import { AxiosResponse } from 'axios'
import {
  MutationFunction,
  MutationOptions,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import request from '../request'
import { QueryOptions } from '../types'

export type Pokemon = {
  id: number
  name: string
}

export type PokemonCreate = Omit<Pokemon, 'id'>

type PokemonResponse = {
  get: AxiosResponse<Pokemon[]>
  getOne: AxiosResponse<Pokemon>
  create: AxiosResponse<Pokemon>
  delete: AxiosResponse<Pokemon>
}

// for get action
type PokemonQueryKey = {
  get: ['getPokemons']
  getOne: ['getPokemonDetail', number]
}

// for mutation action
type PokemonVariables = {
  create: PokemonCreate
  delete: number
}

type PokemonAPI = {
  get: QueryFunction<PokemonResponse['get'], PokemonQueryKey['get']>
  getOne: QueryFunction<PokemonResponse['getOne'], PokemonQueryKey['getOne']>
  create: MutationFunction<
    PokemonResponse['create'],
    PokemonVariables['create']
  >
  delete: MutationFunction<
    PokemonResponse['delete'],
    PokemonVariables['delete']
  >
}

const pokemon: PokemonAPI = {
  get: () => request.get('pokemons'),
  getOne: ({ queryKey: [, id] }) => request.get(`pokemons/${id}`),
  create: data => request.post('pokemons', data),
  delete: id => request.delete(`pokemons/${id}`),
}

export const useGetPokemonQuery = (
  options?: QueryOptions<PokemonResponse['get'], PokemonQueryKey['get']>,
) => useQuery(['getPokemons'], pokemon.get, options)

export const useGetPokemonDetailQuery = (
  id: number,
  options?: QueryOptions<PokemonResponse['getOne'], PokemonQueryKey['getOne']>,
) => useQuery(['getPokemonDetail', id], pokemon.getOne, options)

export const useCreatePokemonMutation = (
  options?: MutationOptions<
    PokemonResponse['create'],
    unknown,
    PokemonVariables['create']
  >,
) => useMutation(['createPokemon'], pokemon.create, options)

export const useDeletePokemonMutation = (
  options?: MutationOptions<
    PokemonResponse['delete'],
    unknown,
    PokemonVariables['delete']
  >,
) => useMutation(['deletePokemon'], pokemon.delete, options)
