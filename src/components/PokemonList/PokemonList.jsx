import { useEffect, useState } from 'react';
import { CardContent, Grid, Button } from '@mui/material';
import axios from 'axios';
import { PokemonDetails } from 'components/PokemonDetails/PokemonDetails';
import {
  ButtonBox,
  CardStyled,
  Container,
  GridWrapper,
  InfoTitle,
} from './PokemonList.Styled';
import { PokemonTitle } from 'components/PokemonDetails/PokemonDetails.Styled';

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
    <Container>
      <GridWrapper>
        <Grid container spacing={2}>
          {pokemonsData?.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} key={pokemon.url}>
              <CardStyled onClick={() => getPokemonInfo(pokemon.url)}>
                <CardContent>
                  <PokemonTitle variant="h4" component="h2">
                    {pokemon.name}
                  </PokemonTitle>
                </CardContent>
              </CardStyled>
            </Grid>
          ))}
        </Grid>
        <ButtonBox>
          <Button
            disabled={!prevLink}
            onClick={() => fetchPokemons(prevLink)}
            startIcon={<>&#10554;</>}
          >
            Prev
          </Button>
          <Button
            disabled={!nextLink}
            onClick={() => fetchPokemons(nextLink)}
            endIcon={<>&#10555;</>}
          >
            Next
          </Button>
        </ButtonBox>
      </GridWrapper>

      {pokemonInfo ? (
        <PokemonDetails pokemonInfo={pokemonInfo} />
      ) : (
        <InfoTitle>Pick a pokemon to see details</InfoTitle>
      )}
    </Container>
  );
}
