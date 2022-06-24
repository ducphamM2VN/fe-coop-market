import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModulesComponent } from './modules.component';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: 'module-dang-ky',
      loadChildren: () => import('./module-dang-ky/module-dang-ky.module')
        .then(m => m.ModuleDangKyModule),
    },
    {
      path: 'module-canhans',
      loadChildren: () => import('./module-canhans/module-canhans.module')
        .then(m => m.ModuleCaNhansModule),
    },
    {
      path: 'module-doanhnghieps',
      loadChildren: () => import('./module-doanhnghieps/module-doanhnghieps.module')
        .then(m => m.ModuleDoanhNghiepsModule),
    },
    {
      path: '',
      redirectTo: 'module-dang-ky',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesRoutingModule {
}
