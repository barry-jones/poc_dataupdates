import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { StorageService } from '../services/storage.service';

interface Release {
  version: number,
  data_file: string,
}

// this guard should only be on the home page of the application, though
// we may need to figure out how to set a guard to a route programatically
// or always have it instantiate on first load.

@Injectable({
  providedIn: 'root'
})
export class DataCheckGuard implements CanActivate {
  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private storage: StorageService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.isNewDataVersionAvailable()
        .then(info => {
          if(info.available) {
            return this.router.createUrlTree(['/loaddata'], 
            { queryParams: { 
              filepath: info.latest.data_file,
              version: info.latest.version
            }});
          }
          else {
            return true;
          }
        });
  }
  
  public async isNewDataVersionAvailable(): Promise<{ available: boolean, latest: Release }> {
    const currentVersion = await this.storage.getCurretVersion();
    const latestVersion = await this.getLatestVersion();

    console.log(`%c gaurd: ${currentVersion} vs ${latestVersion.version }`, 'color: red');

    return { available: currentVersion < latestVersion.version, latest: latestVersion };
  }

  private async getLatestVersion(): Promise<Release> {
    const version = this.firestore.collection<Release>('releases', ref => {
      return ref.orderBy('version', 'desc')
      });
    const somethign = version.get();
    let releases: Release[] = await version.valueChanges().pipe(take(1)).toPromise();
    return releases[0];
  }
}
