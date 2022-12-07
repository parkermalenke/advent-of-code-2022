import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

function countMarker(line) {
  const arr = line.split("")
  let preceedingChunk = arr.splice(0, 13)

  let count = 1
  while (arr.length > 0) {
    const next = arr.shift()
    const test = preceedingChunk.concat([next])
    const set = new Set(test)
    if (new Set(preceedingChunk.concat([next])).size === 14) break

    preceedingChunk.shift()
    preceedingChunk.push(next)
    count += 1
  }

  return count + 13
}

async function partOne() {
  for await (const line of lines) {
    const marker = countMarker(line)
    console.log(marker)
  }
}

partOne()
