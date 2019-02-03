import React, { Fragment } from "react";
import classNames from "classnames";
import { PokemonPropTypes } from "./lib/PropTypeValues";
const propTypes = {
  character: PokemonPropTypes
};
function ChallengerSelection(props) {
  return (
    <Fragment>
      <h2>Select a challenger.</h2>
      <button
        type="button"
        onClick={() => {
          props.send({
            type: "UNDO"
          });
        }}
      >
        Re-select character
      </button>
      <div className="characters">
        {props.characters
          .filter(character => character.id !== props.characterId)
          .map(character => (
            <div
              className={classNames("character-container", {
                defeated: character.defeated
              })}
              key={character.id}
            >
              <div className="character" id={`character${character.id}`}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/img/${character.img}`}
                  alt={character.name}
                />
              </div>
              <p className="character-name">{character.name}</p>
              <button
                type="button"
                aria-label={`Select ${character.name}`}
                disabled={character.defeated}
                onClick={() => {
                  props.send({
                    type: "SELECT",
                    challengerId: character.id
                  });
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
ChallengerSelection.propTypes = propTypes;
export default ChallengerSelection;
