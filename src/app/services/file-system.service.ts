import { Injectable } from '@angular/core';
import { Plugins, FileReadResult, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

let { Filesystem } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  public async readFile(path: string): Promise<string> {
    const result: FileReadResult = await Filesystem.readFile({
      directory: FilesystemDirectory.Data,
      path: path,
      encoding: FilesystemEncoding.UTF8,
    });
    return result.data;
  }
}
