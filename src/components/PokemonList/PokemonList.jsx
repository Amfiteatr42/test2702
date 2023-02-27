import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

export function PokemonList() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextLink, setNextLink] = useState(null);
  const [prevLink, setPrevLink] = useState(null);

  function fetchPokemons(url) {
    axios(url || 'pokemon?limit=12').then(({ data }) => {
      setPokemonData(data.results);
      setNextLink(data.next);
      setPrevLink(data.previous);
    });
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  console.log(nextLink, prevLink);

  return (
    <div style={{ width: 700 }}>
      <Grid container spacing={3}>
        {pokemonData.map(pokemon => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.url}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h2">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
        <Button disabled={!prevLink} onClick={() => fetchPokemons(prevLink)}>
          Prev
        </Button>
        <Button disabled={!nextLink} onClick={() => fetchPokemons(nextLink)}>
          Next
        </Button>
      </div>
    </div>
  );
}
