import { open } from "node:fs/promises"
import * as readline from "node:readline"

export async function linesOfFile(filename) {
  const file = await open(filename)
  const fileStream = file.createReadStream()

  return readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
}

export function chunk(list, count) {
  let output = []
  while (list.length > 0) {
    output.push(list.splice(0, count))
  }
  return output
}

function intersection2(first, second) {
  const intersection = new Set()

  for (const item of first) {
    if (second.has(item)) intersection.add(item)
  }

  return intersection
}

export function intersection(...iterables) {
  return intersectionFunctional(...iterables)
}

function intersectionImperative(...iterables) {
  let intersection
  const sets = iterables.map((x) => new Set(x))

  // Initial intersection
  intersection = intersection2(sets.pop(), sets.pop())

  // If there are more sets, compare them with the running intersection
  while (sets.length > 0) {
    intersection = intersection2(intersection, sets.pop())
  }

  return intersection
}

function intersectionFunctional(...iterables) {
  return iterables
    .map((x) => new Set(x))
    .reduce((acc, set) => intersection2(acc, set))
}

export function range(start, stop, step = 1) {
  if (arguments.length < 2) stop = start

  let result = []
  for (let i = start; i < stop; i += step) {
    result.push(i)
  }

  return result
}

export function last(array) {
  return array[array.length - 1]
}
