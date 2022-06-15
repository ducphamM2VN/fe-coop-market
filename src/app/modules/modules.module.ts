import { NgModule } from '@angular/core';
import { getAppConfigProvider } from '../../environments/environment-config.token';
import { environment } from '../../environments/environment';
import { HttpInterceptorProviders } from '../shared/utils/interceptors';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { ModulesComponent } from './modules.component';
import { BaseContextModule } from '../shared/base/base-context.module';
@NgModule({
  imports: [
    BaseContextModule,
  ],
  providers   : [
    getAppConfigProvider(environment),
    HttpInterceptorProviders,
    CustomTranslateService
  ],
  declarations: [
    ModulesComponent,
  ],
})
export class ModulesModule {
}
