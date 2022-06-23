import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbRadioModule } from '@nebular/theme';
import { NgSelect2Module } from 'ng-select2';
import { BaseContextModule } from '../../shared/base/base-context.module';
import { declareComponent, ModuleDoanhNghiepsRoutingModule } from './module-doanhnghieps-routing.module';
import { ModulesDoanhNghiepsComponent } from './module-doanhnghieps.component';

@NgModule({
    imports: [
        ModuleDoanhNghiepsRoutingModule,
        BaseContextModule,
        NgSelect2Module,
        NbRadioModule
    ],
    declarations: [
        ModulesDoanhNghiepsComponent,
        ...declareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleDoanhNghiepsModule { }
