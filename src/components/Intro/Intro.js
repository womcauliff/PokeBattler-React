import React, { Component, Fragment } from "react";
import { actions } from "xstate";
import { interpret } from "xstate/lib/interpreter";
import LoadingIcon from "../lib/LoadingIcon";
import GifMachine from "./GifMachine";
import gif1 from "../../img/intro1.gif";
import gif2 from "../../img/intro2.gif";
import gif3 from "../../img/intro3.gif";
import gif4 from "../../img/intro4.gif";

const { assign } = actions;
const GifIntroMachine = GifMachine.withConfig({
  actions: {
    addGif1: assign({ currentGif: gif1 }),
    addGif2: assign({ currentGif: gif2 }),
    addGif3: assign({ currentGif: gif3 }),
    addGif4: assign({ currentGif: gif4 })
  }
});

export default class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: GifIntroMachine.initialState,
      numLoaded: 0
    };

    this.service = interpret(GifIntroMachine).onTransition(current =>
      this.setState({ current })
    );
    // .onDone(() => this.props.transition("TIMEOUT"));

    this.skipRef = React.createRef();

    this.onLoaded = this.onLoaded.bind(this);
    this.onSkipClick = this.onSkipClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }
  componentDidMount() {
    this.service.start();
    this.skipRef.current.focus();
  }
  componentWillUnmount() {
    this.service.stop();
  }
  onSkipClick() {
    this.props.transition("SKIP");
  }
  onLoaded() {
    this.setState(
      ({ numLoaded }) => ({ numLoaded: numLoaded + 1 }),
      () => {
        if (this.state.numLoaded === 4) {
          this.service.send({ type: "PRELOADED" });
        }
      }
    );
  }
  onMouseEnter() {
    this.skipRef.current.focus();
  }
  render() {
    const { currentGif = "" } = this.state.current.context;
    return (
      <Fragment>
        <div className="preloading" style={{ display: "none" }}>
          <img src={gif1} onLoad={this.onLoaded} alt="" />
          <img src={gif2} onLoad={this.onLoaded} alt="" />
          <img src={gif4} onLoad={this.onLoaded} alt="" />
          <img src={gif3} onLoad={this.onLoaded} alt="" />
        </div>

        {this.state.current.value === "preloading" ? (
          <div className="center">
            <LoadingIcon />
          </div>
        ) : (
          <div class="img-container">
            <img src={currentGif} alt="" />
          </div>
        )}

        <div className="option-box">
          <button
            className="skip-button"
            onClick={this.onSkipClick}
            type="button"
            ref={this.skipRef}
            onMouseEnter={this.onMouseEnter}
          >
            Skip Intro
          </button>
        </div>
      </Fragment>
    );
  }
}
