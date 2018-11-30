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

  peekUint16() {
    return this.view.getUint16(this.byteOffset);
  }

  getUint16() {
    const int = this.view.getUint16(this.byteOffset);
    this.byteOffset = this.byteOffset + 2;
    return int;
  }

  peekUint32() {
    return this.view.getUint32(this.byteOffset);
  }

  getUint32() {
    const int = this.view.getUint32(this.byteOffset);
    this.byteOffset = this.byteOffset + 4;
    return int;
  }

  getUint1Array(length) {
    //const array = new Uint1Array(this.view.buffer, this.byteOffset, length);
    let binary = this.view.getUint8(this.byteOffset).toString(2);
    let array = [];
    for (let i = 0; i < binary.length; i++) array.push(parseInt(binary[i]));
    this.byteOffset = this.byteOffset + length;
    return array.reverse();
  }

}