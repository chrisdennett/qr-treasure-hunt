export const key = "real secret keys should be long and random";
export const baseClueUrl = "https://qrtreasurehunt.artfly.io/clue/";
// export const baseClueUrl = "https://qr-treasure-hunt.netlify.com/clue/";
// export const localBaseClueUrl = "http://localhost:3000/clueMaker/clue/";

export const cipher = salt => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text =>
    text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
};

export const decipher = salt => {
  const textToChars = text => text.split("").map(c => c.charCodeAt(0));
  //const saltChars = textToChars(salt);
  const applySaltToChar = code =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded =>
    encoded
      .match(/.{1,2}/g)
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join("");
};
