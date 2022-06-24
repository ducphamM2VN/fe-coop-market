import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTaiKhoanComponent } from './components/tai-khoan/tai-khoan.component';
const routes: Routes = [
    {
        path: 'tai-khoan',
        component: ComponentTaiKhoanComponent,
    },
    {
        path: '',
        redirectTo: 'tai-khoan',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentTaiKhoanComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleDangKyRoutingModule {
}


