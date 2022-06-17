import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseContextModule } from '../../shared/base/base-context.module';
import { declareComponent, ModuleCaNhansRoutingModule } from './module-canhans-routing.module';
import { ModulesCaNhansComponent } from './module-canhans.component';

@NgModule({
    imports: [
        ModuleCaNhansRoutingModule,
        BaseContextModule,
        
        
    ],
    declarations: [
        ModulesCaNhansComponent,
        ...declareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleCaNhansModule { }
