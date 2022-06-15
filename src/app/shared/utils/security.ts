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
        let keySize = 256;
        let salt = CryptoJS.lib.WordArray.random(16);
        let key = CryptoJS.PBKDF2(secrectKey, salt, {
            keySize: keySize / 32,
            iterations: 100
        });

        let iv = CryptoJS.lib.WordArray.random(128 / 8);

        let encrypted = CryptoJS.AES.encrypt(clearText, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        let result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

        return result;
    }

    static decrypt(txt: string) {
        var key = CryptoJS.enc.Utf8.parse(secrectKey);
        var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

        var decrypted = CryptoJS.AES.decrypt(txt, key, { iv: iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

}
