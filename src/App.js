import React, { Component } from "react";
// import { matchesState, Machine, State } from "xstate";
import { interpret } from "xstate";
import { matchesState } from "xstate/lib/utils";
import gameStatechart from "./statechart";
import Intro from "./components/Intro/Intro";
import CharacterSelection from "./components/CharacterSelection";
import ChallengerSelection from "./components/ChallengerSelection";
import MoveSelection from "./components/MoveSelection";
import RoundResult from "./components/RoundResult";
import Win from "./components/Win";
import EndGame from "./components/EndGame";

import characters from "./pokemon.json";
import mp3_file from "./sounds/101-opening.mp3";

import "./App.css";
import SoundOptions from "./components/SoundOptions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: gameStatechart.initialState,
      muted: true
    };

    this.matches = this.matches.bind(this);

    this.service = interpret(
      gameStatechart.withContext({
        ...gameStatechart.context,
        characters
      })
    )
      // Subscribe calls to setState each time statechart transitions to new state
      .onTransition(current => this.setState({ current }));
  }

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  matches(path) {
    return matchesState(path, this.state.current.value);
  }

  renderScreen() {
    const { context } = this.state.current;
    const {
      service: { send },
      matches
    } = this;

    if (matches("soundOptions")) {
      return (
        <SoundOptions
          send={send}
          toggleSound={() => {
            this.setState(({ muted }) => ({ muted: !muted }));
          }}
        />
      );
    } else if (matches("intro")) {
      return <Intro transition={send} />;
    } else if (matches("characterSelection")) {
      return <CharacterSelection send={send} characters={context.characters} />;
    } else if (matches("challengerSelection")) {
      return (
        <ChallengerSelection
          send={send}
          characters={context.characters}
          characterId={context.characterId}
        />
      );
    } else if (matches("battle")) {
      if (matches("battle.moveSelection")) {
        return (
          <MoveSelection
            character={context.characters.find(
              character => character.id === context.characterId
            )}
            challenger={context.characters.find(
              character => character.id === context.challengerId
            )}
            transition={send}
          />
        );
      } else if (matches("battle.roundResult")) {
        return (
          <RoundResult
            character={context.characters.find(
              character => character.id === context.characterId
            )}
            challenger={context.characters.find(
              character => character.id === context.challengerId
            )}
            transition={send}
          />
        );
      }
    } else if (matches("win")) {
      return <Win transition={send} />;
    } else if (matches("endGame")) {
      return <EndGame transition={send} />;
    }
    // no default
  }

  render() {
    const { current } = this.state;
    return (
      <div className="App" data-sc-value={current.toStrings()}>
        {this.renderScreen()}
        {current.value !== "soundOptions" && (
          <audio id="audio_player" controls muted={this.state.muted} autoPlay>
            <source id="src_mp3" type="audio/mp3" src={mp3_file} />
            <source id="src_ogg" type="audio/ogg" src="" />
            <object
              id="audio_object"
              type="audio/x-mpeg"
              width="200px"
              height="45px"
              data={mp3_file}
            >
              <param id="param_src" name="src" value={mp3_file} />
              <param id="param_src" name="src" value={mp3_file} />
              <param name="autoplay" value="false" />
              <param name="autostart" value="false" />
            </object>
          </audio>
        )}
      </div>
    );
  }
}

export default App;
