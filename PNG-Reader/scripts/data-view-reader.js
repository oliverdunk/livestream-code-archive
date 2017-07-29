class DataViewReader {

  constructor(buffer) {
    this.view = new DataView(buffer);
    this.byteOffset = 0;
  }

  peekUint8() {
    return this.view.getUint8(this.byteOffset);
  }

  getUint8() {
    return this.view.getUint8(this.byteOffset++);
  }

  peekUint32() {
    return this.view.getUint32(this.byteOffset);
  }

  getUint32() {
    const int = this.view.getUint32(this.byteOffset);
    this.byteOffset = this.byteOffset + 4;
    return int;
  }

}