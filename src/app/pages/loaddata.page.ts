import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Zip } from '@ionic-native/zip/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-loaddata',
  templateUrl: './loaddata.page.html',
  styleUrls: ['./loaddata.page.scss'],
})
export class LoaddataPage {
  public currentProgress: number = 0;
  public percentage: number = 0;
  public activity: string = '';
  public notes: string = '';
  /** Indicates if the data has been downloaded and installed on the device */
  public downloadComplete = false;

  private updating: boolean = false;
  private file: string = '';
  private version: number = 0;

  constructor(private storage: StorageService,
    private router: Router,
    route: ActivatedRoute,
    private http: HttpClient,
    private zip: Zip,
    private _file: File,
    ) { 
      this.file = route.snapshot.queryParams['filepath'];
      this.version = Number.parseFloat(route.snapshot.queryParams['version']);
    }

  async update() {
    this.updating = true;
    await this.getLatestData(this.file);
    this.downloadComplete = true;
  }

  async continue(): Promise<void> {
    await this.storage.setDataVersion(this.version);
    this.router.navigate(['/']);
  }

  async skip(): Promise<void> {
    await this.storage.setDataVersion(this.version);
    this.router.navigate(['/']);
  }

  /**
   * Downloads the latest data from @param file, unzips it to
   * the devices storage and makes it available for the app
   * to read.
   * @param file The url of the file to download
   */
  private async getLatestData(file: string) {
    let downloadedFile: Blob = await this.downloadData(file);
    let location = await this.save(downloadedFile);
    await this.unzip(location);

    let files = await this._file.listDir(this._file.dataDirectory, 'contents');
    console.log(files);
    if(files) {
      let paths: string[] = files.map(e => e.fullPath);    
      this.notes = `All files/directories: ${paths.join(', ')}`
    }

    this.activity = "Completed"
  }

  /**
   * Downloads file from remote server
   * @param file The url of file to download
   */
  private async downloadData(file: string): Promise<any> {
    this.activity = 'Downloading latest data';

    let event = await this.http.get(file, { responseType: 'blob', reportProgress: true, observe: 'events' })
      .pipe(
        tap((event: HttpEvent<Blob>) => {
          switch(event.type) {
            case HttpEventType.DownloadProgress:
              this.percentage = Math.floor(event.loaded / event.total * 100);
              break;
          }
        }),
      )
      .toPromise();
    let t = event as HttpResponse<Blob>;
    return t.body;
  }

  /**
   * Saves the file to local cache
   * @param blob The file data to save to cache
   */
  private async save(blob: Blob): Promise<string> {
    this.activity = 'Saving to disk';

    let success: boolean = false;

    try {
      let response = await this._file.writeFile(this._file.cacheDirectory, 'assets.zip', blob, { replace: true });
      success = true;
    }
    catch(e) {
      console.error('Failed ot save the file', e);
    }
    finally {}
    
    return success ? `${this._file.cacheDirectory}assets.zip` : '';
  }

  /**
   * Unzips the contents of the @param fromFile to the device
   * data directory.
   * @param fromFile The fielpath of the zip file.
   */
  private async unzip(fromFile: string): Promise<void> {
    try {
      let destination = `${this._file.dataDirectory}contents/`;

      // clean out old data from content directory before unpacking
      await this.cleanContentsDirectory();

      this.activity = 'Unzipping data archive'
      console.log({ from: fromFile, to: destination });
      const success = await this.zip.unzip(fromFile, destination, (state) => {
        console.log({ state: state });
      });
      console.log({ zip: success });
    }
    catch(error) {
      console.error(error);
    }
    finally {}
  }

  /**
   * Cleans out the destination data content directory.
   */
  private async cleanContentsDirectory() {
    this.activity = 'Cleaning';

    try {
      await this._file.checkDir(this._file.dataDirectory, 'contents');

      console.log('directory exists, cleaning');
      let result = await this._file.removeRecursively(this._file.dataDirectory, 'contents');
      console.log({ cleanResult: result });
    }
    catch(e){
      console.log('handling error', e);
    }
    finally {}
  }

  private progress(value: number) {
    this.currentProgress = value;
  }
}
