import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ModulesComponent } from './modules.component';

const routes: Routes = [{
  path: '',
  component: ModulesComponent,
  children: [
    {
      path: 'module-categories',
      loadChildren: () => import('./module-categories/module-categories.module')
        .then(m => m.ModuleCategoriesModule),
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
      redirectTo: 'module-canhans',
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
