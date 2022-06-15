import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IFile, IResponseData } from '../data-access';
import { SafeAny } from '../utils/types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    config = environment;
    private apiUrl: string;


    protected http: HttpClient;

    constructor(
        injector: Injector
    ) {
        this.http = injector.get(HttpClient);
        this.apiUrl = `${this.config.apiServer}/api/`;

    }


    /**
     * Upload file
     * @param api
     * @param data
     * @returns post
     */
    upload(api: string, data: SafeAny): Observable<SafeAny> {
        return this.http.post<IFile[]>(this.apiUrl + api, data, {
            reportProgress: true,
            observe: 'events'
        });
    }

    /**
     * Gets http client service
     * @param api
     * @param [params]
     * @returns get
     */
    get(api: string, params?: SafeAny): Observable<IResponseData<SafeAny>> {
        let url = this.apiUrl + api;
        if(params != null && params != undefined){
            url = null;
            const queryString = Object.keys(params)
                                  .map((key) => `${key}=${params[key]}`)
                                  .join('&');
            params == null
                ? (url = this.apiUrl + api)
                : (url = this.apiUrl + api + '?' + queryString);
        }
        return this.http.get<IResponseData<SafeAny>>(url);
    }

    /**
     * Puts http client service
     * @param api
     * @param data
     * @returns put
     */
    put(api: string, data: SafeAny, isRead?: boolean): Observable<SafeAny> {
        const url = this.apiUrl + api;
        const header = new HttpHeaders({ Read: isRead ? 'true' : 'false' });
        return this.http.put<IResponseData<SafeAny>>(url, data, {
            headers: header
        });
    }

    /**
     * Posts http client service
     * @param api
     * @param data
     * @param isRead
     * @returns post
     */
    post(api: string, data: SafeAny, isRead?: boolean): Observable<SafeAny> {
        const url = this.apiUrl + api;
        const header = new HttpHeaders({ Read: isRead ? 'true' : 'false' });
        return this.http.post<IResponseData<SafeAny>>(url, data, {
            headers: header
        });
    }

    /**
     * API delete for single && multiple record
     * @param api
     * @param [body]
     * @returns delete
     */
    delete(api: string, body?: SafeAny): Observable<SafeAny> {
        const url = this.apiUrl + api;
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body
        };
        return this.http.delete<IResponseData<SafeAny>>(url, options);
    }

    /**
     * Reads api service
     * @param api
     * @param data
     * @param isCache
     * @returns read
     */
    read(api: string, data: SafeAny, isCache?: boolean): Observable<SafeAny> {
        // const url = this.apiReadUrl + api;
        const url = this.apiUrl + api;
        let header = new HttpHeaders();
        header = header.append('Read', 'true');
        if (isCache) {
            header = header.set('cache-response', 'true');
        }
        return this.http.post<IResponseData<SafeAny>>(url, data, {
            headers: header
        });
    }
}
