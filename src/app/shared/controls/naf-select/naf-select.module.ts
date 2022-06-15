import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSelectModule } from '@nebular/theme';
import { NgSelect2Module } from 'ng-select2';
import { NafSelectComponent } from './naf-select.component';

@NgModule({
    declarations: [NafSelectComponent],
    entryComponents: [NafSelectComponent],
    imports: [
        CommonModule,
        NbSelectModule,
        NgSelect2Module
    ],
    exports: [
        NafSelectComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA]

})
export class NafSelectModule {
}
