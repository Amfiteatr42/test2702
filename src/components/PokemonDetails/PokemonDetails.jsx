import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export function PokemonDetails({ pokemonInfo }) {
  const { sprites, types, name, abilities } = pokemonInfo;

  function getAbilityNames() {
    return abilities.map(({ ability }) => ability.name).join(', ');
  }

  function getTypes() {
    return types.map(({ type }) => type.name).join(', ');
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt={`${name}'s image from the back`}
        width="100%"
        image={sprites.back_default}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" color="text.primary">
          Abilities:{' '}
          <Typography variant="secondary" color="text.secondary">
            {getAbilityNames()}
          </Typography>
        </Typography>
        <Typography variant="h6" color="text.primary">
          Types:{' '}
          <Typography variant="secondary" color="text.secondary">
            {getTypes()}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
