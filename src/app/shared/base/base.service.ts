import { Inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SafeAny } from '../utils/types';
import { IEnvironmentConfig } from '../../../environments/environment.config';
import { APP_CONFIG } from '../../../environments/environment-config.token';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    configSubject = new BehaviorSubject<SafeAny>(null);
    protected apiUrl: string;
    protected hubUrl: string;
    protected thongBaoUrl: string;
    protected http: HttpClient;

    constructor(
        injector: Injector,
        @Inject(APP_CONFIG) private env: IEnvironmentConfig
    ) {
        this.http = injector.get(HttpClient);
    }

    loadConfig(): Observable<SafeAny> {
        let header = new HttpHeaders();
        header = header.set('cache-response', 'true');
        const jsonFile = `_config/config.${this.env.name}.json?v=1`;
        return this.http.get(jsonFile, {
            headers: header
        }).pipe(
            tap((config: SafeAny) => {
                // this.configSubject.next(config);
                this.thongBaoUrl = `${config.apiServer}/notification-gateway/api/v1`;
                this.apiUrl = `${config.apiServer}/api/${config.version}/`;
                this.hubUrl = config.notificationUrl;
            })
        );
    }
}
