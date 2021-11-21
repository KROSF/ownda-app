import type { Credential } from '@app/generated/schema';
import { MMKV } from 'react-native-mmkv';

type Key = '@token' | '@credential';

export const mmkv = new MMKV();

export class Storage {
  static set(key: Key, value: string | number | boolean) {
    return mmkv.set(key, value);
  }

  static getBoolean(key: Key): boolean {
    return mmkv.getBoolean(key);
  }

  static getString(key: Key): string | undefined {
    return mmkv.getString(key);
  }

  static getNumber(key: Key): number {
    return mmkv.getNumber(key);
  }

  static contains(key: Key): boolean {
    return mmkv.contains(key);
  }

  static delete(key: Key): void {
    return mmkv.delete(key);
  }

  static getAllKeys(): Array<Key> {
    return mmkv.getAllKeys() as Array<Key>;
  }

  static clearAll(): void {
    mmkv.clearAll();
  }

  static addOnValueChangedListener(onValueChanged: (key: Key) => void) {
    return mmkv.addOnValueChangedListener(
      onValueChanged as (key: string) => void,
    );
  }

  static getCredential(): Credential | null {
    const credential = mmkv.getString('@credential');

    if (!credential) {
      return null;
    }

    return JSON.parse(credential);
  }

  static setCredential(credential: Credential): void {
    mmkv.set('@credential', JSON.stringify(credential));
  }
}
