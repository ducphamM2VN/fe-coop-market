import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { SafeAny } from '../types';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService) {
    }

    intercept(
        req: HttpRequest<SafeAny>,
        next: HttpHandler
    ): Observable<HttpEvent<SafeAny>> {
        if (req.headers.get('read') === 'true' || (req.body && req.body?.isPreview === true)) {
            return next.handle(req);
        }
        this.loading.setLoading(true, req.url);
        return next
            .handle(req)
            .pipe(finalize(() => this.loading.setLoading(false, req.url)));
    }
}
