import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
@Component({
  selector: 'ngx-login',
  styleUrls: ['login.component.scss'],
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  images2=[1,2,3,4,5,6,7,8,9].map(x=>'https://bdsweb.com.vn/upload_images/images/bbds/banner-bat-dong-san-doc-02.jpg')

  loginApp (user): void{
    if (user.email == 'admin@gmail.com' && user.password == '123456')
      this.router.navigate(['/modules'])
    else{
      this.errors.push['Email or password not correct'];
      this.showMessages.error = true;
      this.showMessages.success = false;
    }
  }
}
