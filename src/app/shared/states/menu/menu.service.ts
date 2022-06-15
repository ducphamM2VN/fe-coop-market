import { Inject, Injectable } from '@angular/core';
import { MenuStore } from './menu.store';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigEnv } from '../../../web-config/configs';
import { APP_CONFIG } from '../../../../environments/environment-config.token';
import { IEnvironmentConfig } from '../../../../environments/environment.config';
import { UrlConstant } from '../../../constants/url.constant';
import { SafeAny } from '../../utils/types';
import { IMenuSidebar } from '../../data-access';
import { SecurityUtil } from '../../utils/security';
import { SubFolder } from '../../../constants/app.constant';

const PrefixUrl = SubFolder;

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private keyMenuChild = '_key_menu_child';
    private keyStorageMenu = '_key_menu';
    private arrayTitleOfHeader: string[] = [];

    private config = AppConfigEnv.settings;
    private apiUrl: string;

    constructor(
        private store: MenuStore,
        private router: Router,
        private http: HttpClient,
        @Inject(APP_CONFIG) private env: IEnvironmentConfig
    ) {
        // set environment
        this.apiUrl = `${this.config.apiServer}/api/GetMenuPage`;

    }

    initMenu() {
        return this.http.post(this.apiUrl, {}).pipe(
            map((res: SafeAny) => res.result),
            tap(res => {
                this.setMenu(res);
            })
        );
    }

    getNodeParent(toUrl?: string) {
        const path = toUrl ? toUrl : location.pathname;
        const menus = this.getMenuStorage();
        const node = this.checkList(menus, path);
        if (!node || node.length < 1 || path.endsWith('/thong-tin-nhan-su')) {
            return null;
        }

        return menus.find(m => m.mod === node[0].mod);
    }

    setMenu(menus: SafeAny) {
        const body = {
            menu     : menus,
            menuChild: this.getMenuChildLocalStorage()
        };
        this.store.setMenu(body);
        this.setMenuStorage(menus);
    }

    // @ts-ignore
    setMenuChilds(menu: IMenuSidebar, toUrl?: string) {
        if (!menu || !menu.subMenu) return null;
        menu.subMenu.map(m => m.isActive = true);
        menu.subMenu.map(m => {
            if (m.subMenu) {
                m.subMenu.map((x: SafeAny) => {
                    let currentURL = location.pathname;
                    if (toUrl) {
                        currentURL = toUrl;
                    }
                    if (x) {
                        x.isActive = this.convertUrl(x.link) === this.convertUrl(currentURL);
                    }

                });
            }
        });

        const body = {
            menu     : this.getMenuStorage(),
            menuChild: menu
        };

        this.store.setMenu(body);
        this.setMenuChildLocalStorage(menu);
    }

  


    setMenuStorage(menus: IMenuSidebar) {
        localStorage.setItem(this.keyStorageMenu, <string>SecurityUtil.set(JSON.stringify(menus)));
    }

    getMenuStorage(): IMenuSidebar[] {
        try {
            return JSON.parse(<string>SecurityUtil.get(localStorage.getItem(this.keyStorageMenu) as string));
        } catch (e) {
            return [];
        }
    }

    setMenuChildLocalStorage(menu: IMenuSidebar) {
        localStorage.setItem(this.keyMenuChild, JSON.stringify(menu));
    }

    getMenuChildLocalStorage() {
        const local = localStorage.getItem(this.keyMenuChild);
        if (local) {
            return JSON.parse(local);
        }

        const currentURL = location.pathname;
        const menus = this.getMenuStorage();
        const index = menus.findIndex(m => m.isActive);
        if (index < 0) {
            return null;
        }

        const menu = menus[index];
        if (!menu || !menu.subMenu) return null;
        menu.subMenu.map(m => {
            if (m.subMenu) {
                m.subMenu.map(x => {
                    if (x.link === currentURL) {
                        m.isActive = true;
                        x.isActive = true;
                    } else {
                        x.isActive = false;
                    }
                });
            }
        });
        return menu;
    }

    getListOptionWithCurrentUrl() {
        const currentURL = this.router.url;
        const listData = this.checkList(this.getMenuStorage(), currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    getPermissionWithCurrentUrl() {
        const menus = this.getMenuStorage();
        const currentURL = location.pathname;
        const listData = this.checkList(menus, currentURL);
        if (listData.length > 0) {
            return this.getValueType(listData[0]);
        }
        return [];
    }

    getValueType(listData: IMenuSidebar): SafeAny {
        if (!listData || !listData.subMenu) return null;
        if (listData && listData.subMenu && listData.subMenu.length === 0) {
            return listData.types;
        }
        return this.getValueType(listData.subMenu[0]);
    }

    getTitleWithCurrentUrl(redirect?: string): string {
        const menus = this.getMenuStorage();
        const currentURL = redirect ? redirect : location.pathname;
        if (menus && menus.length > 0) {
            const url = currentURL.split('?');

            const listData = this.checkList(menus, url[0]);
            if (listData.length > 0) {
                return this.getDescription(listData[0]);
            }
        }

        if (currentURL === UrlConstant.ROUTE.FORBIDEN) {
            return 'Không có quyền truy cập';
        }
        return '';
    }

    getBreacumbFromUrl(redirect?: string) {
        this.arrayTitleOfHeader = [];
        const title = this.getTitleWithCurrentUrl(redirect);
        if (title) {
            return this.arrayTitleOfHeader;
        }
        return null;
    }

    getDescription(listData: IMenuSidebar): SafeAny {
        if (!listData || !listData.subMenu) return null;
        if (listData && listData.subMenu && listData.subMenu.length === 0) {
            return listData.title;
        }
        return this.getDescription(listData.subMenu[0]);
    }

    checkList(items: IMenuSidebar[], url: string): IMenuSidebar[] {
        return items.reduce((acc: IMenuSidebar[], item) => {
            if (item && item.link && item.subMenu && this.contains(item.link, url) && item.subMenu.length === 0) {
                if (item && item.title) {
                    this.arrayTitleOfHeader.push(item.title);
                    acc.push(item);
                }


            } else if (item.subMenu && item.subMenu.length > 0) {
                const newItems = this.checkList(item.subMenu, url);
                if (newItems.length > 0) {
                    if (item && item.title) {
                        this.arrayTitleOfHeader.push(item.title);
                    }
                    acc.push({
                        css     : item.css,
                        cssBadge: item.cssBadge,
                        title   : item.title,
                        link    : item.link,
                        types   : item.types,
                        isActive: item.isActive,
                        subMenu : newItems,
                        options : item.options,
                        mod     : item.mod
                    });
                }
            }
            return acc;
        }, []);
    }

    private contains(link: string, url: string): boolean {
        return this.convertUrl(link) === this.convertUrl(url);
    }

    private convertUrl(link: string) {
        if (link.includes('master')) {
            link = link.slice(7);
        }

        if (!link) {
            return null;
        }

        link = link.toUpperCase();
        if (!link.startsWith('/')) {
            link = '/' + link;
        }

        if (!this.env.production) {
            for (const value of Object.values(PrefixUrl)) {
                if (link.startsWith('/' + value) && typeof value === 'string') {
                    link = link.slice(value.length + 1);
                    break;
                }
            }
        }
        return link;
    }
}
