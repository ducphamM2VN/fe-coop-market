import { Pipe, PipeTransform } from '@angular/core';
//import { AppConfigEnv } from '@asc-nx/web-config';

const fileExtensions = ['png', 'jpeg', 'jpg'];
const pathDefault = './assets/images/file-icon.jpeg';
const pathUpload = './assets/images/upload.svg';
@Pipe({
    name: 'convertUrl',
})
export class ConvertUrlPipe implements PipeTransform {
    transform(url: string): string {
        if (!url) return pathUpload;
        const ext = url.split('.')[url.split('.').length - 1];
        if (fileExtensions.includes(ext)) {
            //return AppConfigEnv.settings.resourceUrl + url;
            return url;
        }
        
        return pathDefault;
    }
}
