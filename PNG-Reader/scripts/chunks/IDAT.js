class IDATChunk {

  decode(png, length, reader) {
    const compressionMethod = reader.getUint8();
    const flags = reader.getUint8();

    for (let i = 0; i < (length - 6); i++) {
      
    }

    //Final four check bytes
    reader.getUint32();
  }

}