
const CryptoJS = require('crypto-js');

export function encode(str) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}

export function decode(base64) {
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(base64));
}



