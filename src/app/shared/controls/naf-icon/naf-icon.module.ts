import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranferIconPipeModule } from '../../utils/pipes/icon-svg/tranfer-icon.module';
import { SafeHtmlPipeModule } from '../../utils/pipes/safe-html/safe-html.module';
import { NafIconComponent } from './naf-icon.component';

@NgModule({
    imports: [
        CommonModule,
        TranferIconPipeModule,
        SafeHtmlPipeModule],
    declarations: [
        NafIconComponent
    ],
    exports: [
        NafIconComponent
    ]
})
export class NafIconModule {
}
