import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCaNhanComponent } from './components/ca-nhan/form-ca-nhan/form-ca-nhan.component';
import { ComponentCaNhanComponent } from './components/ca-nhan/ca-nhan.component';
import { LocationPickupComponent } from './child-components/location-pickup/location-pickup.component';
import { MoHinhKinhDoanhComponent } from './child-components/mo-hinh-kinh-doanh/mo-hinh-kinh-doanh.component';
const routes: Routes = [
    {
        path: 'ca-nhan',
        component: ComponentCaNhanComponent,
    },
    {
        path: 'form-ca-nhan/:id',
        component: FormCaNhanComponent,
    },
    {
        path: '',
        redirectTo: 'ca-nhan',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentCaNhanComponent,
    FormCaNhanComponent,
    LocationPickupComponent,
    MoHinhKinhDoanhComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleCaNhansRoutingModule {
}


