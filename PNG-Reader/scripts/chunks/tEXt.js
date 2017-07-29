class tEXtChunk {

  decode(png, length, reader) {
    let bytesRead = 1;

    let keyword = [];
    while (reader.peekUint8() != 0) {
      keyword.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    keyword = keyword.join("");
    reader.getUint8();

    let text = [];
    while (bytesRead < length) {
      text.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    text = text.join("");
  }

}