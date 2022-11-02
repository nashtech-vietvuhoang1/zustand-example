import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useQueryClient } from '@tanstack/react-query'
import {
  useCreatePokemonMutation,
  useDeletePokemonMutation,
  useGetPokemonQuery,
} from '../../apis'
import Spinner from '../../components/Spinner'

const Pokemons = () => {
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { data: pokemons, isLoading } = useGetPokemonQuery()

  const { mutate: createPokemon } = useCreatePokemonMutation({
    onSuccess: () => {
      toast(t('pokemon.create'), {
        position: 'top-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      queryClient.invalidateQueries(['getPokemons'])
    },
  })

  const { mutate: deletePokemon } = useDeletePokemonMutation({
    onSuccess: () => {
      toast(t('pokemon.delete'), {
        position: 'top-right',
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      queryClient.invalidateQueries(['getPokemons'])
    },
  })

  if (isLoading) return <Spinner />
  return (
    <div>
      <PokemonInput
        type="text"
        placeholder="Enter pokemon"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <PokemonButton
        type="button"
        onClick={() => {
          setValue('')
          createPokemon({
            name: value,
          })
        }}
      >
        Add pokemon
      </PokemonButton>
      {pokemons?.data.map(pokemon => {
        return (
          <div
            className="flex justify-center items-center gap-10"
            key={pokemon.id}
          >
            <li key={pokemon.id} className="my-4 mx-8">
              {pokemon.name}
            </li>
            <RemoveButton
              type="button"
              onClick={() => deletePokemon(pokemon.id)}
            >
              Remove
            </RemoveButton>
          </div>
        )
      })}
    </div>
  )
}

export default Pokemons

const PokemonInput = styled.input.attrs({
  className:
    'w-1/2 px-2 py-1 my-4 mx-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300',
})``

const PokemonButton = styled.button.attrs({
  className:
    'px-6 py-1 text-sm rounded shadow bg-emerald-100 hover:bg-emerald-200 text-emerald-500',
})``

const RemoveButton = styled.button.attrs({
  className:
    'bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-400 rounded',
})``
