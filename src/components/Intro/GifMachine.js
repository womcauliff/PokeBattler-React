import { Machine } from "xstate";
const GifMachine = Machine({
  initial: "preloading",
  context: {
    currentGif: null
  },
  states: {
    preloading: {
      on: { PRELOADED: "grass" }
    },
    grass: {
      onEntry: "addGif1",
      initial: "display",
      states: {
        display: {
          after: { 2000: "complete" }
        },
        complete: { type: "final" }
      },
      onDone: { target: "pan" }
    },
    pan: {
      onEntry: "addGif2",
      initial: "display",
      states: {
        display: {
          after: { 2100: "complete" }
        },
        complete: { type: "final" }
      },
      onDone: { target: "attack" }
    },
    attack: {
      onEntry: "addGif3",
      initial: "display",
      states: {
        display: {
          after: { 4900: "complete" }
        },
        complete: { type: "final" }
      },
      onDone: { target: "counterattack" }
    },
    counterattack: {
      onEntry: ["addGif4"],
      initial: "display",
      states: {
        display: {
          after: { 3000: "complete" }
        },
        complete: { type: "final" }
      },
      onDone: { target: "complete" }
    },
    complete: {
      type: "final"
    }
  }
});

export default GifMachine;
