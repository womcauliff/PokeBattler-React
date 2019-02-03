import { Machine, send, assign, actions } from "xstate";

export default Machine(
  {
    id: "pokebattler",
    context: {
      characters: [],
      characterId: null,
      challengerId: null
    },
    initial: "soundOptions",
    //initial: "characterSelection",
    states: {
      soundOptions: {
        on: { SELECTED: "intro" }
      },
      intro: {
        on: {
          TIMEOUT: "characterSelection",
          SKIP: "characterSelection"
        }
      },
      characterSelection: {
        on: {
          SELECT: {
            target: "challengerSelection",
            actions: ["setCharacter"]
          }
        }
      },
      challengerSelection: {
        on: {
          SELECT: {
            target: "battleSetup",
            actions: ["setChallenger"]
          },
          UNDO: {
            target: "characterSelection",
            actions: ["resetCharacter"]
          }
        }
      },
      battleSetup: {
        on: {
          // Transient transition
          "": {
            target: "battle",
            actions: ["resetHP"]
          }
        }
      },
      battle: {
        on: {
          WIN: "win",
          LOSS: "loss"
        },
        initial: "moveSelection",
        states: {
          moveSelection: {
            on: {
              SELECT: {
                target: "roundResult",
                actions: ["calculateResult"]
              }
            }
          },
          roundResult: {
            on: {
              NEXT: [
                {
                  cond: "characterIsDefeated",
                  actions: send("LOSS")
                },
                {
                  cond: "challengerIsDefeated",
                  actions: send("WIN")
                },
                {
                  target: "moveSelection"
                }
              ]
            }
          }
        }
      },
      loss: { on: { RETRY: "characterSelection" } },
      win: {
        on: {
          NEXT: [
            {
              cond: "noChallengersRemaining",
              target: "endGame"
            },
            { target: "challengerSelection" }
          ]
        }
      },
      endGame: {
        on: {
          RETRY: {
            target: "characterSelection",
            actions: ["resetDefeated"]
          }
        }
      }
    }
  },
  {
    actions: {
      setCharacter: assign({
        characterId: (ctx, e) => e.characterId
      }),
      resetCharacter: assign({ characterId: null }),
      setChallenger: assign({
        challengerId: (ctx, e) => e.challengerId
      }),
      resetHP: assign({
        characters: ctx =>
          ctx.characters.map(character => {
            if (
              character.id === ctx.characterId ||
              character.id === ctx.challengerId
            ) {
              return {
                ...character,
                currentHp: calcHp(character),
                totalHp: calcHp(character)
              };
            }
            return character;
          })
      }),
      calculateResult: assign({
        characters: (ctx, e) => {
          const p1 = ctx.characters.find(({ id }) => id === ctx.characterId);
          return ctx.characters.map(character => {
            if (character.id === ctx.challengerId) {
              return {
                ...character,
                currentHp:
                  character.currentHp - calcDamage(p1, character, e.moveId) < 0
                    ? 0
                    : character.currentHp - calcDamage(p1, character, e.moveId),
                defeated: character.currentHp - 50 <= 0
              };
            }
            return character;
          });
        }
      }),
      resetDefeated: assign({
        characters: ctx =>
          ctx.characters.map(character => ({
            ...character,
            defeated: false
          }))
      })
    },
    activities: {},
    guards: {
      characterIsDefeated: ({ characters, characterId }) =>
        characters.find(({ id }) => id === characterId).currentHp <= 0,
      challengerIsDefeated: ({ characters, challengerId }) =>
        characters.find(({ id }) => id === challengerId).currentHp <= 0,
      noChallengersRemaining: ({ characters, characterId }) =>
        characters.filter(({ id, defeated }) => id !== characterId && !defeated)
          .length === 0
    },
    services: {}
  }
);

function calcHp(p) {
  return Math.floor((p.baseHp * 2 * p.level) / 100) + p.level + 10;
}

function calcDamage(p1, p2, moveId) {
  console.log(p1, p2, moveId);
  const { level, moves } = p1;
  const move = moves.find(move => move.id === moveId);
  console.log(move);
  const power = move.basePower;
  let attack = 1;
  let defense = 1;

  // added to give player advantage
  // if (p1ID == starterID) {
  //   level = level * 3.5;
  // }

  // If move's category is physical,
  // use player's attack
  // and opponent's defense stats
  if (move.category === "physical") {
    attack = p1.baseAttack;
    defense = p2.baseDefense;
  } else {
    // else if move's category is special,
    // use player's special attack
    // and opponent's special defense stats
    attack = p1.baseSpAttack;
    defense = p2.baseSpDefense;
  }

  // first half of damage calculation
  let dmg = (((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2;

  // Calculate damage modifier
  let modifier = 1;

  let STAB = 1;
  let typeEffectiveness = 1;
  let criticalHit = 1;
  let other = 1;
  let random = 1;

  // determine if same-type attack-bonus
  for (let i = 0; i < p1.type.length; i += 1) {
    if (move.type === p1.type[i]) {
      STAB = 1.5;
      break;
    }
  }

  // check if move type matches opponent's resistances
  for (let i = 0; i < p2.resistances.length; i += 1) {
    if (move.type === p2.resistances[i]) {
      typeEffectiveness *= 0.5;

      // added to give player advantage
      // if (p1ID == starterID) {
      //   typeEffectiveness *= 0.90;
      // }
      // addDescription($("<p>It's not very effective..</p>"));
    }
  }

  // check if move type matches opponent's weaknesses
  for (let i = 0; i < p2.weaknesses.length; i += 1) {
    if (move.type === p2.weaknesses[i]) {
      typeEffectiveness *= 2;
      // // added to give player advantage
      // if (p1ID == challengerID) {
      //   typeEffectiveness *= 1;
      // }

      // addDescription($("<p>It's super effective!</p>"));
    }
  }

  // ignoring critical hits for now
  criticalHit = 1;

  // ignoring ability to hold items
  other = 1;

  // calculating random decimal in the range of [0.85, 1]
  const max = 1.0;
  const min = 0.85;
  random = Math.random() * (max - min) + min;

  // calculating modifier, updating damage value
  modifier = STAB * typeEffectiveness * criticalHit * other * random;
  dmg *= modifier;
  return Math.floor(dmg);
}
