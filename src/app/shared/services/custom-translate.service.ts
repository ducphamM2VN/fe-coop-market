import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstant } from '../../constants/app.constant';
import { LangEnum } from '../../constants/enum.constant';
import { SafeAny } from '../utils/types';

@Injectable({
    providedIn: 'root',
})
export class CustomTranslateService {
    translateResources: SafeAny;

    langs = [
        {
            symbol: LangEnum.VI,
            name: 'Tiếng Việt',
            path: './assets/images/Flag_vietnam.png',
        },
        {
            symbol: LangEnum.EN,
            name: 'Tiếng Anh',
            path: './assets/images/Flag_kingdom.png',
        },
    ];

    constructor(private translate: TranslateService) {
        this.translate.use(this.getCurrentLang());
        this.load();
    }

    load() {
        // this.translate.getTranslation(this.getCurrentLang()).subscribe(res => {
        //     this.translateResources = res;
        //     this.translate.use(this.getCurrentLang());
        // });
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vi/) ? browserLang : LangEnum.VI);
    }

    get(key: string): string {
        const currentLang = this.translate.currentLang || 'vi'; // get current language
        const returnValue = this.translate.translations[currentLang][key]; // get converted string from current language
        if (returnValue === undefined) {
          return this.translate.translations.en_merch[key]; // if value is getting undefined then return default language string, en_merch is default english language file here
        } else {
          return returnValue;
        }
    }

    setCurrentLang(lang: string) {
        if (lang && lang.match(/en|vi/)) {
            this.translate.use(lang);
        } else {
            this.translate.setDefaultLang(LangEnum.VI);
            this.translate.use(LangEnum.VI);
        }
    }

    getCurrentLang() {
        const currentLang = localStorage.getItem(AppConstant.CURRENT_LANG);
        if (currentLang !== null && currentLang !== undefined) {
            return currentLang;
        }
        return LangEnum.VI;
    }

    languageName() {
        const currentLang = this.getCurrentLang();
        const findNameLang = this.langs.find(m => m.symbol === currentLang);
        if (!findNameLang) return null;
        return findNameLang.name;
    }

    languageImage() {
        const currentLang = this.getCurrentLang();
        const findPathImage = this.langs.find(m => m.symbol === currentLang);
        if (!findPathImage) return null;
        return findPathImage.path;
    }
}
