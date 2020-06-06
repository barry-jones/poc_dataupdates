import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

let { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private dataVersion: number = 1.0;

  constructor() { }

  public async getCurretVersion(): Promise<number> {
    const current = await Storage.get({ key: 'data_version' });
    let version = Number.parseFloat(current.value);
    return Number.isNaN(version) ? 0 : version;
  }

  public async setDataVersion(version: number): Promise<void> {
    await Storage.set({ key: 'data_version', value: version.toString() });
  }
}
