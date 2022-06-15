import { Inject, Injectable, Injector } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtUtil } from './jwt';
import { HandlerService } from '../../services/handler-error.service';
import { AuthStore } from './auth.store';
import { APP_CONFIG } from '../../../../environments/environment-config.token';
import { IEnvironmentConfig } from '../../../../environments/environment.config';
import { navigateToExternalLink, SafeAny } from '../types';
import { UrlConstant } from '../../../constants/url.constant';
import { BaseService } from '../../base/base.service';
import { SecurityUtil } from '../security';
import { SubFolder } from '../../../constants/app.constant';
import { ITokenInfo } from '../../../auth/data-access/models/user-token.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
    private sessionCode = 'sessionCode';

    constructor(
        injector: Injector,
        private router: Router,
        private handlerError: HandlerService,
        private authStore: AuthStore,
        @Inject(APP_CONFIG) env: IEnvironmentConfig
    ) {
        super(injector, env);
    }

    /**
     * Do login
     * @param requestLogin
     * @returns
     */
    doLogin(requestLogin: SafeAny): Observable<boolean> {
        const url = `${this.apiUrl}/Login`;
        return this.setRequestLogin(url, requestLogin);
    }

    /**
     * Do refresh token
     * @returns refresh token
     */
    doRefreshToken(): Observable<boolean> {
        const url = `${this.apiUrl}/Refresh-Token`;
        const requestRefreshToken = {
            refreshToken: JwtUtil.getRefreshToken()
        };
        return this.setRequestLogin(url, requestRefreshToken);
    }

    /**
     * Do logout
     * @returns
     */
    doLogout(model: SafeAny) {
        return this.http
                   .post(`${this.apiUrl}/Logout`, model).pipe(
            finalize(() => this.doBackLogin())
        );
    }

    doBackLogin() {
        this.clearAll();
        this.redirectToLogin();
    }

    /**
     * Determines whether authorized is
     */
    isAuthorized(): boolean {
        return !!JwtUtil.getAccessToken();
    }

    setCurrentSessionCode(value: string): void {
        localStorage.setItem(this.sessionCode, value);
    }

    getCurrentSessionCode(): string {
        const currentSessionCode = localStorage.getItem(this.sessionCode);
        if (currentSessionCode) {
            return currentSessionCode;
        }

        const newSessionCode = SecurityUtil.generateGuid();
        this.setCurrentSessionCode(newSessionCode);
        return newSessionCode;
    }

    clearAll() {
        const sessionKey = this.getCurrentSessionCode();
        localStorage.clear();
        localStorage.setItem(this.sessionCode, sessionKey);
    }

    redirectToLogin() {
        const currentUrl = location.pathname;
        const folders = Object.values(SubFolder).map(f => f);
        if (folders.filter(f => currentUrl.split('/').includes(f as string)).length > 0) {
            navigateToExternalLink(UrlConstant.ROUTE.LOGIN, null);
        }
        this.router.navigate([UrlConstant.ROUTE.LOGIN]);
    }

    private setRequestLogin(url: string, request: SafeAny): Observable<boolean> {
        return this.http.post(url, request).pipe(
            map((res: SafeAny) => res.result),
            map((tokenInfo: ITokenInfo) => {
                // set user token
                if (tokenInfo) {
                    JwtUtil.setUserToken(tokenInfo);
                    // update current user
                    const userInfo = JwtUtil.getUserInfo();
                    if (userInfo) {
                        this.authStore.setCurrentUser(userInfo);
                    }

                    return true;
                }
                return false;
            })
        );
    }
}
