import React, { Fragment } from "react";
import { PokemonPropTypes } from "./lib/PropTypeValues";

const propTypes = {
  character: PokemonPropTypes,
  challenger: PokemonPropTypes
};
function MoveSelection(props) {
  const { character, challenger } = props;
  console.log(character);
  return (
    <Fragment>
      <h2>Select a Move.</h2>

      <div className="characters">
        <div className="character-container">
          <div className="character" id={`character${character.id}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/${character.img}`}
              alt={character.name}
            />
          </div>
          <p className="character-name">{character.name}</p>
          <p>{character.currentHp}</p>
          {character.moves.map(move => (
            <button
              type="button"
              key={move.id}
              onClick={() => {
                props.transition({
                  type: "SELECT",
                  moveId: move.id
                });
              }}
            >
              {move.name}
            </button>
          ))}
        </div>
        <div className="character-container">
          <div className="character" id={`character${challenger.id}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/${challenger.img}`}
              alt={challenger.name}
            />
          </div>
          <p className="character-name">{challenger.name}</p>
          <p>{challenger.currentHp}</p>
        </div>
      </div>
    </Fragment>
  );
}
MoveSelection.propTypes = propTypes;
export default MoveSelection;
