/**
 * CryptoService
 * Framework-agnostic AES encryption/decryption utility for Mixcore SDK
 *
 * @remarks
 * Refactored from legacy AngularJS service. All SPA dependencies removed.
 * Uses CryptoJS (must be provided by consumer).
 */
export interface CryptoServiceConfig {
  apiEncryptKey: string;
  CryptoJS: any;
}

export class CryptoService {
  private config: CryptoServiceConfig;
  private size = 256;

  constructor(config: CryptoServiceConfig) {
    this.config = config;
  }

  encryptAES(message: string, iCompleteEncodedKey?: string): string {
    const { key, iv } = this.parseKeys(iCompleteEncodedKey || this.config.apiEncryptKey);
    return this.encryptMessage(message, key, iv);
  }

  decryptAES(ciphertext: string, iCompleteEncodedKey?: string): string {
    const { key, iv } = this.parseKeys(iCompleteEncodedKey || this.config.apiEncryptKey);
    return this.decryptMessage(ciphertext, key, iv);
  }

  private encryptMessage(message: string, key: any, iv: any): string {
    const { CryptoJS } = this.config;
    const options = {
      iv,
      keySize: this.size / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    const encrypted = CryptoJS.AES.encrypt(message, key, options);
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  private decryptMessage(ciphertext: string, key: any, iv: any): string {
    const { CryptoJS } = this.config;
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    });
    const options = {
      iv,
      keySize: this.size / 8,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, options);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  private parseKeys(iCompleteEncodedKey: string) {
    const { CryptoJS } = this.config;
    const keyStrings = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Base64.parse(iCompleteEncodedKey)
    ).split(",");
    return {
      iv: CryptoJS.enc.Base64.parse(keyStrings[0]),
      key: CryptoJS.enc.Base64.parse(keyStrings[1]),
    };
  }
}
