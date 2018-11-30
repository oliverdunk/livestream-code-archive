//Specification: http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html

class PNG {

  constructor() {
    this._fetchImage().then(buffer => this.decode(buffer));
  }

  async _fetchImage() {
    let image = await fetch("./test.png");
    return await image.arrayBuffer();
  }

  decode(buffer) {
    const bytes = new DataView(buffer);
    const signature = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

    for (let i = 0; i < signature.length; i++) {
      if (signature[i] != bytes.getUint8(i)) {
        //Signature didn't match that of a normal PNG file
        throw new Error("Invalid file signature.");
      }
    }

    let chunk = 1;
    let byteOffset = 8;
    let finished = false;

    while (!finished) {
      console.log("--------- NEXT CHUNK ---------");

      const length = bytes.getUint32(byteOffset);
      byteOffset = byteOffset + 4;

      let chunkType = [];
      for (let i = 0; i < 4; i++) {
        chunkType.push(String.fromCharCode(bytes.getUint8(byteOffset++)));
      }
      chunkType = chunkType.join("");

      console.log(`Length = ${length}`);
      console.log(`Type = ${chunkType}`);

      switch (chunkType) {
        case "IHDR":
          this.width = bytes.getUint32(byteOffset);
          this.height = bytes.getUint32(byteOffset + 4);
          byteOffset = byteOffset + 8;
          this.bitDepth = bytes.getUint8(byteOffset++);
          this.colorType = bytes.getUint8(byteOffset++);
          this.compressionMethod = bytes.getUint8(byteOffset++);
          this.filterMethod = bytes.getUint8(byteOffset++);
          this.interlaceMethod = bytes.getUint8(byteOffset++);

          if (this.colorType != 6) {
            throw new Error("Color type not yet implemented.");
          }

          //Output basic file information
          console.log(`Width = ${this.width}`);
          console.log(`Height = ${this.height}`);
          break;
        case "tEXt":
          let keyword = [];
          let text = [];
          let separatorReached = false;

          for (let i = 0; i < length; i++) {
            const addTo = !separatorReached ? keyword : text;
            if (bytes.getUint8(byteOffset) == 0) separatorReached = true;
            else addTo.push(String.fromCharCode(bytes.getUint8(byteOffset)));
            byteOffset++;
          }

          console.log(`${keyword.join("")} = ${text.join("")}`);
          break;
        case "iTXt":
          const finalByte = byteOffset + length;
          let iKeyword = [];

          while (bytes.getUint8(byteOffset) != 0) {
            iKeyword.push(String.fromCharCode(bytes.getUint8(byteOffset++)));
          }

          iKeyword = iKeyword.join("");
          byteOffset++;

          let compression = bytes.getUint8(byteOffset++);
          let compressionType = bytes.getUint8(byteOffset++);

          if (compression != 0) {
            throw new Error("Compressed text not yet implemented.");
          }

          let language = [];
          
          while (bytes.getUint8(byteOffset) != 0) {
            language.push(String.fromCharCode(bytes.getUint8(byteOffset++)));
          }

          language = language.join("");
          byteOffset++;

          let translatedKeyword = [];
          
          while (bytes.getUint8(byteOffset) != 0) {
            translatedKeyword.push(String.fromCharCode(bytes.getUint8(byteOffset++)));
          }

          translatedKeyword = translatedKeyword.join("");
          byteOffset++;

          let iText = [];

          while (byteOffset < finalByte) {
            iText.push(String.fromCharCode(bytes.getUint8(byteOffset++)));
          }

          iText = iText.join("");

          console.log(`${iKeyword} = ${iText}`);
          break;
      }

      //Error correction code  - we can ignore this for now
      const crc = bytes.getUint32(byteOffset);
      byteOffset = byteOffset + 4;

      if (chunk == 4) finished = true;
      chunk++;
    }
  }

}

window.addEventListener('load', _ => new PNG());