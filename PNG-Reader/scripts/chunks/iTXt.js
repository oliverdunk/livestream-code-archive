class iTXtChunk {

  decode(png, length, reader) {
    let bytesRead = 1; //TODO: Work out why this isn't three

    let keyword = [];
    while (reader.peekUint8() != 0) {
      keyword.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    keyword = keyword.join("");
    reader.getUint8();

    let compressionFlag = reader.getUint8();
    let compressionMethod = reader.getUint8();
    bytesRead = bytesRead + 2;

    let language = [];
    while (reader.peekUint8() != 0) {
      language.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    language = language.join("");

    let translatedKeyword = [];
    while (reader.peekUint8() != 0) {
      translatedKeyword.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    translatedKeyword = translatedKeyword.join("");

    let text = [];
    while (bytesRead < length) {
      text.push(String.fromCharCode(reader.getUint8()));
      bytesRead++;
    }
    text = text.join("");
  }

}