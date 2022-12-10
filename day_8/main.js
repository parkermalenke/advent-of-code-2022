import * as $$ from "#lib/utils"

const lines = await $$.linesOfFile("./input.txt")

function getRow(index, matrix) {
  const row = matrix[index[0]]
  return [row.slice(0, index[1]), row.slice(index[1] + 1)]
}

function getColumn(index, matrix) {
  const col = matrix.map((row) => row[index[1]])
  return [col.slice(0, index[0]), col.slice(index[0] + 1)]
}

function visible(height, rowCol) {
  const shorter = (tree) => parseInt(tree, 10) < parseInt(height, 10)
  return rowCol[0].every(shorter) || rowCol[1].every(shorter)
}

async function partOne() {
  let rows = []
  for await (const line of lines) {
    rows.push(line.split(""))
  }

  let visibleCount = 0
  rows.forEach((row, ri) => {
    row.forEach((tree, ci) => {
      const index = [ri, ci]
      const rowSplit = getRow(index, rows)
      const colSplit = getColumn(index, rows)

      if (visible(tree, rowSplit) || visible(tree, colSplit)) {
        if (
          index[0] !== 0 &&
          index[0] !== 4 &&
          index[1] !== 0 &&
          index[1] !== 4
        ) {
          // console.log(index, "is visible", tree, rowSplit, colSplit)
        }
        visibleCount += 1
      }
    })
  })
  console.log(visibleCount)
}

function scoreSplit(height, rowCol) {
  height = parseInt(height, 10)
  let score1 = 0
  for (let i = rowCol[0].length - 1; i >= 0; i--) {
    const tree = parseInt(rowCol[0][i], 10)
    if (tree === undefined) break
    if (tree < height) score1 += 1
    if (tree >= height) {
      score1 += 1
      break
    }
  }

  let score2 = 0
  for (let i = 0; i <= rowCol[1].length - 1; i++) {
    const tree = rowCol[1][i]
    if (tree === undefined) break
    if (tree < height) score2 += 1
    if (tree >= height) {
      score2 += 1
      break
    }
  }

  return score1 * score2
}

async function partTwo() {
  let rows = []
  for await (const line of lines) {
    rows.push(line.split(""))
  }

  let mostScenic = 0
  rows.forEach((row, ri) => {
    row.forEach((tree, ci) => {
      const index = [ri, ci]
      const rowSplit = getRow(index, rows)
      const colSplit = getColumn(index, rows)

      const treeScore = scoreSplit(tree, rowSplit) * scoreSplit(tree, colSplit)
      if (treeScore > mostScenic) mostScenic = treeScore
    })
  })
  console.log(mostScenic)
}

partTwo()
