import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverflowBodyDirective } from './overflow-body.directive';

@NgModule({
    declarations: [OverflowBodyDirective],
    imports: [CommonModule],
    exports: [OverflowBodyDirective]
})
export class OverflowBodyModule {
}
