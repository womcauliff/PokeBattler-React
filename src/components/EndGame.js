import React from "react";

export default function EndGame(props) {
  return (
    <button
      type="button"
      onClick={() => {
        props.transition({
          type: "RETRY"
        });
      }}
    >
      New Game
    </button>
  );
}
