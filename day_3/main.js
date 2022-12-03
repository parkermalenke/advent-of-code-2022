import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

function parseRucksack(line) {
  let chars = [...line]
  const split = $$.chunk(chars, chars.length / 2)
  const left = split[0]
  const right = split[1]

  return { left, right }
}

function findCommonItem(rucksack) {
  const leftSet = new Set(rucksack.left)
  const rightSet = new Set(rucksack.right)

  for (const item of leftSet) {
    if (rightSet.has(item)) {
      return item
    }
  }

  throw new Error("No common items")
}

function calcPriority(item) {
  const priorities = [
    ..." abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ]
  return priorities.indexOf(item)
}

async function partOne() {
  let totalPriority = 0
  for await (const line of lines) {
    const rucksack = parseRucksack(line)
    const common = findCommonItem(rucksack)
    const priority = calcPriority(common)
    console.log(common, priority)
    totalPriority += priority
  }
  console.log(totalPriority)
}

async function partTwo() {
  let totalPriority = 0
  const allLines = []
  for await (const line of lines) {
    allLines.push(line)
  }

  const groups = $$.chunk(allLines, 3)
  for (const group of groups) {
    const common = [...$$.intersection(...group)][0]
    const priority = calcPriority(common)
    console.log(common, priority)
    totalPriority += priority
  }
  console.log(totalPriority)
}

// await partOne()
await partTwo()
