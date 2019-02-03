import React, { Fragment } from "react";

export default function RoundResult(props) {
  const { character, challenger } = props;
  return (
    <Fragment>
      <h2>Round Result.</h2>

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
          <button
            type="button"
            onClick={() => {
              props.transition({ type: "NEXT" });
            }}
          >
            Next
          </button>
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
