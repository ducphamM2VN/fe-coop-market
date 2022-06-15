import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHideIfUnauthorizedDirective } from './hide-if-unauthorized.directive';

@NgModule({
    declarations: [
        MyHideIfUnauthorizedDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MyHideIfUnauthorizedDirective
    ]
})
export class HideIfUnauthorizedModule {
}
