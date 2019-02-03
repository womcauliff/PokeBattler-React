import React, { Component, Fragment } from "react";
import LoadingIcon from "./lib/LoadingIcon";

class SoundOptions extends Component {
  constructor(props) {
    super(props);

    this.moveFocus = this.moveFocus.bind(this);
    this.yesRef = React.createRef();
    this.noRef = React.createRef();
  }

  componentDidMount() {
    this.yesRef.current.focus();
  }

  /**
   * Handles mounseenter events for option buttons, changing the focus to the button.
   * @param {SyntheticEvent} e Mouseenter Event
   */
  moveFocus(e) {
    if (e.target.innerText === "Yes") {
      this.yesRef.current.focus();
    }
    if (e.target.innerText === "No") {
      this.noRef.current.focus();
    }
  }

  render() {
    const { send } = this.props;

    return (
      <Fragment>
        <h2>Turn on Game Audio?</h2>

        <LoadingIcon />

        <div className="option-box">
          <button
            type="button"
            onMouseEnter={this.moveFocus}
            onClick={() => {
              this.props.toggleSound();
              send({ type: "SELECTED" });
            }}
            ref={this.yesRef}
          >
            Yes
          </button>
          <button
            type="button"
            onMouseEnter={this.moveFocus}
            onClick={() => {
              send({ type: "SELECTED" });
            }}
            ref={this.noRef}
          >
            No
          </button>
        </div>
      </Fragment>
    );
  }
}

export default SoundOptions;
