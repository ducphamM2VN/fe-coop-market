import { Pipe, PipeTransform } from '@angular/core';
import { IconDictionary } from '../../../../constants/icon.constant';

@Pipe({name: 'iconSvg'})
export class TranferIconPipe implements PipeTransform {
    transform(iconName: string): string {
        return <string>IconDictionary.get(iconName);
    }
}
