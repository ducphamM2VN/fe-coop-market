import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAppConfig } from './app-config.model';
import { APP_CONFIG } from '../../../environments/environment-config.token';
import { IEnvironmentConfig } from '../../../environments/environment.config';

@Injectable()
export class AppConfigEnv {
    static settings: IAppConfig;

    constructor(
        @Inject(APP_CONFIG) private env: IEnvironmentConfig,
        private http: HttpClient
    ) {
    }

    load() {
        const jsonFile = ``;
        let header = new HttpHeaders();
        header = header.set('cache-response', 'true');
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile, {
                    headers: header,
                })
                .toPromise()
                .then((response: any) => {
                    AppConfigEnv.settings = response as IAppConfig;
                    resolve();
                })
                .catch((response: any) => {
                    reject(
                        `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
                    );
                });
        });
    }

    getConfig() {
        return AppConfigEnv.settings;
    }
}
