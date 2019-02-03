import React, { Fragment } from "react";
import { PokemonPropTypes } from "./lib/PropTypeValues";
const propTypes = {
  character: PokemonPropTypes
};
function CharacterSelection(props) {
  return (
    <Fragment>
      <h2>Select your Pokémon.</h2>

      <div className="characters">
        {props.characters.map(character => (
          <div className="character-container" key={character.id}>
            <div className="character" id={`character${character.id}`}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/img/${character.img}`}
                alt={character.name}
              />
            </div>
            <h3 className="character-name">{character.name}</h3>
            <button
              type="button"
              aria-label={`Select ${character.name}`}
              onClick={() => {
                props.send({ type: "SELECT", characterId: character.id });
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
CharacterSelection.propTypes = propTypes;
export default CharacterSelection;
