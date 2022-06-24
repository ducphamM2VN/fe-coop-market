import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbTabsetModule
} from '@nebular/theme';
import {Pseudo3dCarouselComponent}from './pseudo-3d-carousel/pseudo-3d-carousel.component'
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxLoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbTabsetModule,
    NbAuthModule,
  ],
  declarations: [
    NgxLoginComponent,Pseudo3dCarouselComponent,RegisterComponent
  ],
})
export class NgxAuthModule {
}