import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaseContextModule } from '../../shared/base/base-context.module';
import { declareComponent, ModuleCategoriesRoutingModule } from './module-categories-routing.module';
import { ModulesCategoriesComponent } from './module-categories.component';

@NgModule({
    imports: [
        ModuleCategoriesRoutingModule,
        BaseContextModule
    ],
    declarations: [
        ModulesCategoriesComponent,
        ...declareComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuleCategoriesModule { }
