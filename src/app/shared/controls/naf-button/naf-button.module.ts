import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipeModule } from '../../utils/pipes/safe-html/safe-html.module';
import { TranferIconPipeModule } from '../../utils/pipes/icon-svg/tranfer-icon.module';
import { NafButtonComponent } from './naf-button.component';

@NgModule({
    imports: [CommonModule, SafeHtmlPipeModule, TranferIconPipeModule],
    declarations: [
        NafButtonComponent
    ],
    exports: [
        NafButtonComponent
    ]
})
export class NafButtonModule {
}
