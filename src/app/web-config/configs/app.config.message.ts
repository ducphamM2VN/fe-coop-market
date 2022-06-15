import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../constants/app.constant';
@Injectable({ providedIn: 'root' })
export class AppMessageConfig {
    static settings: any;

    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = `_config/message.json?v=${AppConstant.VERSION}`;
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(jsonFile)
                .toPromise()
                .then((response: unknown) => {
                    AppMessageConfig.settings = response as unknown;
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
        return AppMessageConfig.settings;
    }
}
