import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

function parsePairs(line) {
  return line.split(",").map((rawBounds) => {
    const bounds = rawBounds.split("-").map((x) => parseInt(x, 10))
    return $$.range(bounds[0], bounds[1] + 1)
  })
}

function rangesContain(range1, range2) {
  const r1StartsBelowR2 = range1[0] <= range2[0]
  const r1EndsAboveR2 = $$.last(range1) >= $$.last(range2)

  if (r1StartsBelowR2 && r1EndsAboveR2) {
    return true
  }

  const r2StartsBelowR1 = range2[0] <= range1[0]
  const r2EndsAboveR1 = $$.last(range2) >= $$.last(range1)

  if (r2StartsBelowR1 && r2EndsAboveR1) {
    return true
  }

  return false
}

function rangesOverlap(range1, range2) {
  const r1StartsBelowR2 = range1[0] <= range2[0]
  const r1EndsAboveR2Start = $$.last(range1) >= range2[0]

  const r2StartsBelowR1 = range2[0] <= range1[0]
  const r2EndsAboveR1Start = $$.last(range2) >= range1[0]

  if (r1StartsBelowR2 && r1EndsAboveR2Start) {
    return true
  }

  if (r2StartsBelowR1 && r2EndsAboveR1Start) {
    return true
  }

  return false
}

async function partOne() {
  let acc = 0

  for await (const line of lines) {
    const ranges = parsePairs(line)
    if (rangesOverlap(...ranges)) acc += 1
  }

  console.log(acc)
}

partOne()
