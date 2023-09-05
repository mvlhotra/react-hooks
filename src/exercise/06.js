// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, {useEffect, useState} from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

const STATUS = {
  idle: 'no request made yet',
  pending: 'request started',
  resolved: 'request successful',
  rejected: 'request failed',
}

function PokemonInfo({pokemonName}) {
  const [pokeState, setPokeState] = useState({
    pokemon: null,
    status: STATUS.idle,
    error: null,
  })

  const {status, pokemon, error} = pokeState

  useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokeState({status: STATUS.pending})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokeState({pokemon: pokemonData, status: STATUS.resolved})
      })
      .catch(error => {
        setPokeState({error: error, status: STATUS.rejected})
      })
  }, [pokemonName])

  if (status === STATUS.rejected) {
    throw error
  } else if (status === STATUS.idle) {
    return <p>Submit a pokemon</p>
  } else if (status === STATUS.pending) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === STATUS.resolved) {
    return <PokemonDataView pokemon={pokemon} />
  } else {
    throw new Error('An unexpected error occurred.')
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          key={pokemonName}
          resetKeys={[pokemonName]}
          onReset={handleReset}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
