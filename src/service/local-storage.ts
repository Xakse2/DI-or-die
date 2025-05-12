import { prefix } from '../const/prefix';

export class LocalStorage {
  private readonly prefix: string = prefix;

  public setDate(key: string, value: string): void {
    localStorage.setItem(this.keyGenerate(key), value);
  }

  public getDate(key: string): string | null {
    return localStorage.getItem(this.keyGenerate(key));
  }

  public keyGenerate(key: string): string {
    return this.prefix + key;
  }

  public clear(): void {
    localStorage.clear();
  }

  public removeDate(key: string): void {
    localStorage.removeItem(this.keyGenerate(key));
  }
}

export const storage = new LocalStorage();
