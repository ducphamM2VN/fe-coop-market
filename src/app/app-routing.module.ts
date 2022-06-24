import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  {
    path: 'modules',
    loadChildren: () => import('./modules/modules.module')
      .then(m => m.ModulesModule),
  },
  {
    path: 'auth',
    loadChildren:()=>import('././auth/auth.module').then((x) => x.NgxAuthModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'modules' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
