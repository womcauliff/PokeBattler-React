import React, { Fragment } from "react";

export default function Win(props) {
  return (
    <Fragment>
      <h2>You won!</h2>
      <button
        type="button"
        onClick={() => {
          props.transition({
            type: "NEXT"
          });
        }}
      >
        Next
      </button>
    </Fragment>
  );
}
