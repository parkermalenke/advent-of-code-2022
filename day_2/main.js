import * as $$ from "#lib/utils"

const ROCK = "ROCK"
const PAPER = "PAPER"
const SCISSORS = "SCISSORS"

const LOSE = "LOSE"
const DRAW = "DRAW"
const WIN = "WIN"

const decryptTheirMove = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
}

const decryptMyMove = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
}

const decryptOutcome = {
  X: LOSE,
  Y: DRAW,
  Z: WIN,
}

function parseMoves(line) {
  const [theirMoveRaw, myMoveRaw] = line.split(" ")
  return [decryptTheirMove[theirMoveRaw], decryptMyMove[myMoveRaw]]
}

function getMyMove(outcome, theirMove) {
  const strategies = {
    LOSE: {
      ROCK: SCISSORS,
      PAPER: ROCK,
      SCISSORS: PAPER,
    },
    DRAW: {
      ROCK: ROCK,
      PAPER: PAPER,
      SCISSORS: SCISSORS,
    },
    WIN: {
      ROCK: PAPER,
      PAPER: SCISSORS,
      SCISSORS: ROCK,
    },
  }

  return strategies[outcome][theirMove]
}

function parseMoves2(line) {
  const [theirMoveRaw, outcomeRaw] = line.split(" ")
  const theirMove = decryptTheirMove[theirMoveRaw]
  const outcome = decryptOutcome[outcomeRaw]
  return [theirMove, getMyMove(outcome, theirMove)]
}

function calcMoveScore(moves) {
  const scores = {
    ROCK: 1,
    PAPER: 2,
    SCISSORS: 3,
  }

  return scores[moves[1]]
}

function calcRoundScore(moves) {
  if (moves[0] === moves[1]) return 3

  const winningMoves = {
    ROCK: PAPER,
    PAPER: SCISSORS,
    SCISSORS: ROCK,
  }

  const won = winningMoves[moves[0]] === moves[1]

  return won ? 6 : 0
}

function calcScore(moves) {
  return calcMoveScore(moves) + calcRoundScore(moves)
}

const lines = await $$.linesOfFile("./input.txt")
let totalScore = 0
for await (const line of lines) {
  const moves = parseMoves2(line)
  const score = calcScore(moves)
  console.log(line, score)
  totalScore += score
}

console.log(totalScore)
