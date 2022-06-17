import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCaNhanComponent } from './components/ca-nhan/form-ca-nhan/form-ca-nhan.component';
import { ComponentCaNhanComponent } from './components/ca-nhan/ca-nhan.component';
const routes: Routes = [
    {
        path: 'ca-nhan',
        component: ComponentCaNhanComponent,
    },
    {
        path: '',
        redirectTo: 'ca-nhan',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentCaNhanComponent,
    FormCaNhanComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleCaNhansRoutingModule {
}

