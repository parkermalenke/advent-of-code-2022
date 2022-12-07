import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

async function allLines() {
  let result = []
  for await (const line of lines) {
    result.push(line)
  }
  return result
}

function getParts(lines) {
  const separator = lines.indexOf("")
  return [lines.slice(0, separator - 1), lines.slice(separator + 1)]
}

function parseCrates(rawCrates) {
  let crates = []

  rawCrates.forEach((row) => {
    let stackNum = 0
    for (let i = 0; i < row.length; i += 4) {
      const chunk = row.slice(i, i + 4)
      if (crates[stackNum] === undefined) crates.push([])

      if (chunk.trim().length > 0) {
        const crateName = chunk.split("[")[1].split("]")[0]
        crates[stackNum].push(crateName)
      }

      stackNum += 1
    }
  })

  return crates
}

function parseMovesOne(rawMoves) {
  let moves = []

  rawMoves.forEach((row) => {
    const found = row.match(
      /move\s(?<count>\d+)\sfrom\s(?<source>\d+)\sto\s(?<dest>\d+)/
    )

    $$.range(found.groups.count).forEach((_) =>
      moves.push([
        parseInt(found.groups.source, 10),
        parseInt(found.groups.dest, 10),
      ])
    )
  })

  return moves
}

function parseMoves(rawMoves) {
  let moves = []

  rawMoves.forEach((row) => {
    const found = row.match(
      /move\s(?<count>\d+)\sfrom\s(?<source>\d+)\sto\s(?<dest>\d+)/
    )
    moves.push([
      parseInt(found.groups.source, 10),
      parseInt(found.groups.dest, 10),
      parseInt(found.groups.count, 10),
    ])
  })

  return moves
}

function performMoves(crates, moves) {
  return moves.reduce((currentCrates, move) => {
    const crates = currentCrates[move[0] - 1].splice(0, move[2])
    currentCrates[move[1] - 1] = crates.concat(currentCrates[move[1] - 1])

    return currentCrates
  }, crates)
}

function readTops(crates) {
  return crates.map((c) => c[0]).join("")
}

async function partOne() {
  const [rawCrates, rawMoves] = getParts(await allLines())
  const crates = parseCrates(rawCrates)
  const moves = parseMoves(rawMoves)

  const newCrates = performMoves(crates, moves)
  const tops = readTops(newCrates)
  console.log(tops)
}

partOne()
