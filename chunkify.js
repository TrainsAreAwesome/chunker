import * as MWGIESTOOLS from "mwgiestools"
import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import "node:buffer"

let getBuffer = (file) => {
    return readFileSync(file)
}

let saveToFile = (thing, path, i) => {
    writeFileSync(path, thing)
    console.log(`Saving chunk ${i}`)
}

let saveChunkedFile = (ar, originalFileName, dechunkCommand) => {
    if(typeof(ar) !== "object") {
        console.log("saveChunkedFile was called, but something that wasnt an object was passed!")
    }
    try{
    mkdirSync(`${originalFileName}-chunks`)
    } catch{
        console.log("Directory allready exists. Continuing anyway...")
    }
    for(let i = 0; i < ar.length; ++i) {
        saveToFile(ar[i], `./${originalFileName}-chunks/${originalFileName}-chunk${i}.chunk`, i)
    }
    MWGIESTOOLS.renderText("chunked file", "G", "W")
    console.log(dechunkCommand)
}

let chunkify = (originalFileName, chunkSize = 25) => { //arg 0 is file to chunkify and arg1 is chunk size in MB
    let originalFile = getBuffer(originalFileName) //gets the byte buffer
    let originalFileSize = originalFile.byteLength / 1000000 //gets the size of the file in MB

    let amountOfSplits = Math.ceil(originalFileSize / chunkSize) //gets the amount of splits required to chunk the file to the chuck size
    console.log(`Original file size: ${originalFileSize}MB`)

    if(amountOfSplits < 1) { //if your chunkifying a file thats smaller than the chunk size, then why?
        console.log("Why are you chunkifying this if the amount of data per chunk is less than the file size?")
    }
    console.log(`Amount of chunks: ${amountOfSplits}`)
    console.log(`File to chunkify: ${originalFileName}`)

    let chunk = [] //the array of all the chunks

    let fileIndex = 0 //the index for where we are in the byte buffer

    split: for(let i = 0; i < amountOfSplits; ++i) { //splits the byte buffer into chucks of size chunkSize * 1000000
        console.log(`Creating chunk ${i}`)
        let currentChunk = Buffer.alloc((chunkSize * 1000000))
        currentChunk = Buffer.copyBytesFrom(originalFile, ((chunkSize * 1000000) * i), chunkSize * 1000000)
        chunk[i] = currentChunk
    }
    let dechunkCommand = `\nCommand to dechunkify:\nnode dechunkify.js ${originalFileName}-chunks ${amountOfSplits - 1} ${chunkSize} ${originalFileName}`
    saveChunkedFile(chunk, originalFileName, dechunkCommand)
}

if(process.argv[3]) {
    chunkify(process.argv[2], process.argv[3])
} else {
    chunkify(process.argv[2])
}