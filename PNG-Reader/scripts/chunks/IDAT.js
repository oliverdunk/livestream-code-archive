class IDATChunk {

  decode(png, length, reader) {
    //120 means block is uncompressed and not the final block
    const compressionMethod = reader.getUint8();
    const checkBits = reader.getUint8();

    //DEFLATE stream works with bits, so we have to buffer manually
    const headerStream = reader.getUint1Array(1);
    const finalBlock = headerStream[0];
    const compression = parseInt(`${headerStream[1]}${headerStream[2]}`, 2);

    const dataLength = reader.getUint16();
    reader.getUint16();

    for (let i = 0; i < dataLength; i++) {
      reader.getUint8();
    }

    //Final four check bytes
    reader.getUint32();
  }

}