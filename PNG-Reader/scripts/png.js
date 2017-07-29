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
    //Let's decode this image!
    const reader = new DataViewReader(buffer);

    //Check to see if the PNG signature is present
    const expected = [137, 80, 78, 71, 13, 10, 26, 10];
    for (var i = 0; i < 8; i++) {
      if (expected[i] != reader.getUint8()) {
        throw new Error("PNG signature is not valid.");
      }
    }

    let finished = false;

    while (!finished) {
      const length = reader.getUint32();
      
      let type = [];
      for (var i = 0; i < 4; i++) type.push(String.fromCharCode(reader.getUint8()));
      type = type.join("");

      switch (type) {
        case "IHDR": {
          this.header = new IHDRChunk();
          this.header.decode(this, length, reader);
          break;
        }
        case "tEXt": {
          let chunk = new tEXtChunk();
          chunk.decode(this, length, reader);
          break;
        }
        case "iTXt": {
          let chunk = new iTXtChunk();
          chunk.decode(this, length, reader);
          break;
        }
        case "IDAT": {
          let chunk = new IDATChunk();
          chunk.decode(this, length, reader);
          finished = true;
          break;
        }
        default: {
          throw new Error(`Chunk type ${type} encountered which is not yet implemented.`);
          break;
        }
      }

      //Skip error correction altogether
      reader.getUint32();
    }

  }

}

window.addEventListener('load', _ => new PNG());