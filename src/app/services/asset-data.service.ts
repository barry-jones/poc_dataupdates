import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Content, DataSource } from './data.interfaces';

export class AssetDataService implements DataSource {

  constructor(private http: HttpClient) { }

  public async getContent<T>(fromFile: string): Promise<T> {
    console.log('%c obtaining content from www/asset folder', 'color: orange');
    return this.http.get<T>(`/assets/content/${fromFile}.json`).toPromise();
  }
}
