import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNganhHangComponent } from './components/nganh-hang/form-nganh-hang/form-nganh-hang.component';
import { ComponentNganhHangComponent } from './components/nganh-hang/nganh-hang.component';
const routes: Routes = [
    {
        path: 'nganh-hang',
        component: ComponentNganhHangComponent,
    },
    {
        path: '',
        redirectTo: 'nganh-hang',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentNganhHangComponent,
    FormNganhHangComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleCategoriesRoutingModule {
}


