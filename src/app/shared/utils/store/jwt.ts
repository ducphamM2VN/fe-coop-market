import { ITokenInfo, IUserInfo } from "../../../auth/data-access/models/user-token.model";

const jwtToken = 'jwt-token';

export class JwtUtil {
    // static helper = new JwtHelperService();

    /**
     * Sets user token
     * @param userToken
     */
    static setUserToken(userToken: ITokenInfo) {
        localStorage.setItem(jwtToken, JSON.stringify(userToken));
    }

    /**
     * Gets refresh token
     * @returns
     */
    static getRefreshToken(): string {
        const tokenInfo = this.getTokenInfo();
        if (!tokenInfo) return null;
        return tokenInfo.refreshToken;
    }

    /**
     * Gets access token
     * @returns
     */
    static getAccessToken() {
        const tokenInfo = this.getTokenInfo();
        if (!tokenInfo) return null;
        return tokenInfo.accessToken;
    }

    /**
     * Get Token info
     * */
    static getTokenInfo(): ITokenInfo {
        const tokenInfo = JSON.parse(<string>localStorage.getItem(jwtToken)) as ITokenInfo;
        if (!tokenInfo) return null;
        return tokenInfo;
    }

    /**
     * Gets user info by decode token
     */
    static getUserInfo(): IUserInfo {
        const accessToken = this.getAccessToken();
        if (!accessToken) {
            return null;
        }
        return this.decodeToken(accessToken);
    }

    static isTokenExpired() {
        const token = this.getAccessToken();
        const decode = this.decodeToken(token);
        if (!decode) return true;

        const expiry = decode.exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    static decodeToken(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (ex) {
            return null;
        }
    }
}
