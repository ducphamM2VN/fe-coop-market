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
      path: '',
      redirectTo: 'module-categories',
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
