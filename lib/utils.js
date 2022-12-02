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
