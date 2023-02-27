import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import { PokemonDetails } from 'components/PokemonDetails/PokemonDetails';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

export function PokemonList() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [nextLink, setNextLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);

  function fetchPokemons(url) {
    axios(url || 'pokemon?limit=12').then(({ data }) => {
      setPokemonsData(data.results);
      setNextLink(data.next);
      setPrevLink(data.previous);
    });
  }

  function getPokemonInfo(url) {
    axios(url).then(({ data }) => {
      setPokemonInfo(data);
    });
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 500, marginRight: 50 }}>
        <Grid container spacing={3}>
          {pokemonsData.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} key={pokemon.url}>
              <Card onClick={() => getPokemonInfo(pokemon.url)}>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {pokemon.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}
        >
          <Button disabled={!prevLink} onClick={() => fetchPokemons(prevLink)}>
            Prev
          </Button>
          <Button disabled={!nextLink} onClick={() => fetchPokemons(nextLink)}>
            Next
          </Button>
        </div>
      </div>

      {pokemonInfo ? (
        <PokemonDetails pokemonInfo={pokemonInfo} />
      ) : (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Pick a pokemon to see details
        </h2>
      )}
    </div>
  );
}
