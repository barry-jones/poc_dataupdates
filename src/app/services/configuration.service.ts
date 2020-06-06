import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  public get platform(): string {
    return Capacitor.platform;
  }
}
