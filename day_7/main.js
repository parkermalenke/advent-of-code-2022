import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

function parseLineToAction(line) {
  switch (line) {
    case "$ cd /":
      return { type: "SET_CURSOR", to: [] }
    case "$ cd ..":
      return { type: "UP_CURSOR" }
    case "$ ls":
      return { type: "NOOP" }
  }

  const parts = line.split(" ")

  if (parts[0] === "$" && parts[1] === "cd") {
    return { type: "IN_CURSOR", to: parts[2] }
  }

  if (parts[0] === "dir") {
    return { type: "ADD_DIR", named: parts[1] }
  }

  // Should only have files left to deal with
  return { type: "ADD_FILE", named: parts[1], sized: parseFloat(parts[0], 10) }
}

// Written by chatGPT!!
function deepSet(obj, keys, value) {
  keys.reduce((obj, key, index) => {
    if (index === keys.length - 1) {
      // If this is the last key, set the value
      obj[key] = value
    } else {
      // If this is not the last key, create a nested object
      obj[key] = obj[key] || {}
    }
    return obj[key]
  }, obj)
}

function applyActionToTree(action, tree) {
  switch (action.type) {
    case "NOOP":
      return tree
    case "SET_CURSOR":
      return { ...tree, cursor: action.to }
    case "UP_CURSOR":
      return { ...tree, cursor: tree.cursor.slice(0, -1) }
    case "IN_CURSOR":
      return { ...tree, cursor: tree.cursor.concat([action.to]) }
    case "ADD_DIR":
      deepSet(tree.data, tree.cursor.concat([action.named]), {})
      return tree
    case "ADD_FILE":
      deepSet(tree.data, tree.cursor.concat([action.named]), action.sized)
      return tree
  }
}

function calcDirSizes(data) {
  // get all dirs (i.e. keys)
  // calc dir size only accounting for immediate child files
  // add recursive sizes back in.
  let sizes = []
  function calcDirSize(dirName, children) {
    const size = Object.keys(children).reduce((size, key) => {
      switch (typeof children[key]) {
        case "number":
          return size + children[key]
        case "object":
          return size + calcDirSize(key, children[key])
        default:
          console.log("!!!!!UNEXPECTED!!!!!")
      }
    }, 0)
    sizes.push(size)
    return size
  }

  calcDirSize("/", data)

  return sizes
}

function filter(obj, test) {
  return Object.keys(obj).reduce((acc, key) => {
    if (test(obj[key])) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

async function partOne() {
  let tree = {
    cursor: [],
    data: {},
  }
  for await (const line of lines) {
    const action = parseLineToAction(line)
    tree = applyActionToTree(action, tree)
  }
  const sizes = calcDirSizes(tree.data)
  // const underLimit = sizes.filter((x) => x <= 100000)
  // console.log(underLimit.reduce((acc, i) => acc + i))
  sizes.sort((a, b) => (a <= b ? -1 : 1))
  const used = $$.last(sizes)
  const free = 70000000 - used
  const toFree = 30000000 - free
  console.log("Free up at least", toFree)
  const bigEnough = sizes.filter((x) => x >= toFree)
  console.log(bigEnough[0])
}

partOne()

const sample = {
  a: {},
  "b.txt": 14848514,
  "c.dat": 8504156,
  d: {},
}
