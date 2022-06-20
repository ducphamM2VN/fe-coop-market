import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NbRadioModule } from '@nebular/theme';
import { NgSelect2Module } from 'ng-select2';
import { BaseContextModule } from '../../shared/base/base-context.module';
import { declareComponent, ModuleCaNhansRoutingModule } from './module-canhans-routing.module';
import { ModulesCaNhansComponent } from './module-canhans.component';

@NgModule({
    imports: [
        ModuleCaNhansRoutingModule,
        BaseContextModule,
        NgSelect2Module,
        NbRadioModule
    ],
    declarations: [
        ModulesCaNhansComponent,
        ...declareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleCaNhansModule { }
