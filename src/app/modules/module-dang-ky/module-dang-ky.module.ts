import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaseContextModule } from '../../shared/base/base-context.module';
import { declareComponent, ModuleDangKyRoutingModule } from './module-dang-ky-routing.module';
import { ModulesCategoriesComponent } from './module-dang-ky.component';

@NgModule({
    imports: [
        ModuleDangKyRoutingModule,
        BaseContextModule
    ],
    declarations: [
        ModulesCategoriesComponent,
        ...declareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleDangKyModule { }
