import * as MWGIESTOOLS from "mwgiestools"
import { readFileSync, writeFileSync} from "node:fs" //imports the fs api components we need
import "node:buffer"

let folder = process.argv[2] //gets the cmdline args for what to dechunkify
let amountOfChunks = process.argv[3]
let chunkSize = process.argv[4]
let fileName = process.argv[5]

let getBuffer = (file) => {
    return readFileSync(file) //this is for getting a chunk
}

let saveToFile = (thing, path) => {
    writeFileSync(path, thing) //this is for saving the dechunked file
    MWGIESTOOLS.renderText("dechunked file", "G", "W")
    console.log(`Dechunked file as: ${path}`)
}

let chunk = []

for(let i = 0; i <= amountOfChunks; ++i){ //gets a chunk array
    chunk[i] = getBuffer(`${folder}/chunk${i}.chunk`)
}

let assembledBuffer = chunk[0]


for(let i = 1; i < chunk.length; ++i) {
    assembledBuffer = Buffer.concat([assembledBuffer, chunk[i]])
    console.log(`Re-assembling chunk ${i}`)
}
saveToFile(assembledBuffer, `DECHUNKED-${fileName}`)