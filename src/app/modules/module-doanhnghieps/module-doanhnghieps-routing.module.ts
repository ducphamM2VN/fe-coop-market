import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationPickupComponent } from './child-components/location-pickup/location-pickup.component';
import { MoHinhKinhDoanhComponent } from './child-components/mo-hinh-kinh-doanh/mo-hinh-kinh-doanh.component';
import { ComponentDoanhNghiepComponent } from './components/doanh-nghiep/doanh-nghiep.component';
import { FormDoanhNghiepComponent } from './components/doanh-nghiep/form-doanh-nghiep/form-doanh-nghiep.component';
const routes: Routes = [
    {
        path: 'doanh-nghiep',
        component: ComponentDoanhNghiepComponent,
    },
    {
        path: 'form-doanh-nghiep/:id',
        component: FormDoanhNghiepComponent,
    },
    {
        path: '',
        redirectTo: 'doanh-nghiep',
        pathMatch: 'full',
    },
];

export const declareComponent = [
    ComponentDoanhNghiepComponent,
    FormDoanhNghiepComponent,
    LocationPickupComponent,
    MoHinhKinhDoanhComponent
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModuleDoanhNghiepsRoutingModule {
}


