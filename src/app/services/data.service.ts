import { Injectable } from '@angular/core';
import { DataSource, Content } from './data.interfaces';
import { HttpClient } from '@angular/common/http';
import { LocalDataService } from './local-data.service';
import { AssetDataService } from './asset-data.service';
import { ConfigurationService } from './configuration.service';
import { FileSystemService } from './file-system.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {
  private source: DataSource;

  constructor(
    private http: HttpClient, 
    private file: FileSystemService,
    private config: ConfigurationService
    ) { 
  }

  public async getContent(): Promise<Content> {
    let source = await this.getSource();
    return await source.getContent<Content>('content');
  }

  /**
   * Performs checks to figure out if we should be using the
   * data in www/assets or looking on device storage.
   */
  private async shouldUseLocalData(): Promise<boolean> {
    console.log('checking local storage for data');
    let shouldUse: boolean = false;

    if(this.config.platform === 'ios' || this.config.platform === 'android') {

      try {
        // lots of issues attempting to just check if a file exists, so
        // going ot be better to just attempt to read the contents of a 
        // known file.
        let result = await this.file.readFile(`${environment.localDataFolder}/content.json`)
        console.log(result);
        shouldUse = true;
      }
      catch(e) {
        console.error(e);
      }
      finally {}
    }

    return shouldUse;
  }

  private async getSource(): Promise<DataSource> {
    if(this.source) return this.source; // if if it already available return it

    try {
      if(await this.shouldUseLocalData()) {
        this.source = new LocalDataService(this.file);
      }
      else {
        this.source = new AssetDataService(this.http);
      }
    }
    catch(error) {
      console.error(error);
      this.source = new AssetDataService(this.http); // fallback
    }
    finally {}

    return this.source;
  }
}
