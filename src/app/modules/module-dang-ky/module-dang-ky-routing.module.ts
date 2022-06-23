import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNganhHangComponent } from './components/nganh-hang/form-nganh-hang/form-nganh-hang.component';
import { ComponentNganhHangComponent } from './components/nganh-hang/nganh-hang.component';
import { ComponentTaiKhoanComponent } from './components/tai-khoan/tai-khoan.component';
const routes: Routes = [
    {
        path: 'nganh-hang',
        component: ComponentNganhHangComponent,
    },
    {
        path: 'tai-khoan',
        component: ComponentTaiKhoanComponent,
    },
    {
        path: '',
        redirectTo: 'nganh-hang',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentNganhHangComponent,
    FormNganhHangComponent,
    ComponentTaiKhoanComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleDangKyRoutingModule {
}


