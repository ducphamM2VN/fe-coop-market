import * as CryptoJS from 'crypto-js';
import { SafeAny } from './types';

const keyEncode =
  'Zq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfT';
const secrectKey = 'AAACAwQFBgcICQoLDA0ODw==';
export class SecurityUtil {
  static set(text: string) {
    try {
      return CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(text.toString()),
        keyEncode
      ).toString();
    } catch (e) {
      return null;
    }
  }

  /**
   * Decrypts key
   * @param text
   * @returns
   */
  static get(text: string): SafeAny {
    if (!text) return;
    try {
      return CryptoJS.AES.decrypt(text, keyEncode).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return null;
    }
  }

  static generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  static encrypted(clearText: string) {
    let _key = CryptoJS.enc.Utf8.parse(secrectKey);
    let _iv = CryptoJS.enc.Utf8.parse(keyEncode);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(clearText), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  static decrypt(txt: string) {
    let _key = CryptoJS.enc.Utf8.parse(secrectKey);
    let _iv = CryptoJS.enc.Utf8.parse(keyEncode);

    return CryptoJS.AES.decrypt(
      txt, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }

}
