class IHDRChunk {

  decode(png, length, reader) {
    this.width = reader.getUint32();
    this.height = reader.getUint32();
    this.bitDepth = reader.getUint8();
    this.colorType = reader.getUint8();
    this.compressionMethod = reader.getUint8();
    this.filterMethod = reader.getUint8();
    this.interlaceMethod = reader.getUint8();
  }

}