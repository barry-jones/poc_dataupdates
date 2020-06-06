import { HttpClient } from '@angular/common/http';
import { Capacitor, Plugins, FilesystemDirectory } from '@capacitor/core';

import { AssetDataService } from './asset-data.service';
import { LocalDataService } from './local-data.service';
import { InjectionToken } from '@angular/core';
import { DataService } from './data.service';

const { Filesystem } = Plugins;

// https://angular.io/guide/dependency-injection-providers

export const DATA_SERVICE = new InjectionToken<DataService>('DataService interface implementation');

/*
// this will be executed every time the service is requested by DI so
// should make this as quick as possible. This is not good enough as it
// stands.
// todo: Cache the test response and or look in to how services are cached as Singletons
export async function dataServiceFactory(http: HttpClient): Promise<DataService> {
    return await createDataService(http);
}

// adding providers to modules
// { provide: DATA_SERVICE, useFactory: dataServiceFactory, deps: [ HttpClient ]},
// we also need to add @Inject(DATA_SERVICE) to the constructors of
// consumers.

async function createDataService(http: HttpClient): Promise<DataService> {
  let service: DataService = new AssetDataService(http);  

  switch (Capacitor.platform) {
    case "ios":
    case "android":
      // check if we have a filesystem storage of assets to use
      let result = await Filesystem.readdir({
          path: 'contents',
          // todo: check if this is visible in any way to the user, allowing them to pull it off the phone
          directory: FilesystemDirectory.Data,
        });
        
      console.log({ fsResponse: result });
      if(result.files && result.files.length > 0) {
        service = new LocalDataService();
      }
      break;
  }

  return service;
}
*/