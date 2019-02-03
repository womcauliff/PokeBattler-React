import PropTypes from "prop-types";

export const PokemonTypesPropTypes = PropTypes.oneOf([
  "normal",
  "fire",
  "fighting",
  "water",
  "flying",
  "grass",
  "poison",
  "electric",
  "ground",
  "psychic",
  "rock",
  "ice",
  "bug",
  "dragon",
  "ghost",
  "dark",
  "steel",
  "fairy"
]);

export const PokemonMovePropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  basePower: PropTypes.number,
  type: PokemonTypesPropTypes,
  category: PropTypes.oneOf(["special", "physical"]),
  flavor_text: PropTypes.string
});

export const PokemonPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(PokemonTypesPropTypes),
  weaknesses: PropTypes.arrayOf(PokemonTypesPropTypes),
  resistances: PropTypes.arrayOf(PokemonTypesPropTypes),
  baseHp: PropTypes.number,
  baseAttack: PropTypes.number,
  baseDefense: PropTypes.number,
  baseSpAttack: PropTypes.number,
  baseSpDefense: PropTypes.number,
  level: PropTypes.number,
  currentHp: PropTypes.number,
  totalHp: PropTypes.number,
  defeated: PropTypes.bool,
  moves: PropTypes.arrayOf(PokemonMovePropTypes)
});

export default {
  PokemonTypesPropTypes,
  PokemonMovePropTypes,
  PokemonPropTypes
};
