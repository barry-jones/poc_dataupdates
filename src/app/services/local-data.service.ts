import { DataSource } from './data.interfaces';
import { environment } from 'src/environments/environment';
import { FileSystemService } from './file-system.service';

/**
 * Wraps a native file service plugin
 */
export class LocalDataService implements DataSource {

  constructor(private file: FileSystemService) { }

  public async getContent<T>(fromFile: string): Promise<T> {
    console.log('%c obtaining content from local data', 'color: blue');
    const result = await this.file.readFile(
      `${environment.localDataFolder}/${fromFile}.json`
      );
    return JSON.parse(result);
  }
}
