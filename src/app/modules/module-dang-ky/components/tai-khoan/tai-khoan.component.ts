import { Component, Injector, OnInit, Input } from '@angular/core';
import { FormGroup , FormBuilder, AbstractControl} from '@angular/forms';
import { Validators, ValidationErrors } from '@angular/forms';
import { FormUtil } from '../../../../shared/utils/formvalidate';
import { UrlModuleCategories } from '../../data-access/apis/api-list';
import { ITaiKhoan } from '../../data-access/models/taikhoan.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { SafeAny } from '../../../../shared/utils/types';
import {ComparePasswordValidator} from '../../../../shared/utils/validator';
@Component({
    selector: 'ngx-tai-khoan',
    templateUrl: './tai-khoan.component.html'
})

export class ComponentTaiKhoanComponent implements OnInit {    
    @Input() model: ITaiKhoan;
    form: FormGroup;    
    loaiTaiKhoan: string;
    notification: NotificationService;    
    translate: CustomTranslateService;
    formBuilder: FormBuilder;
    url: String = UrlModuleCategories.ROUTE_CATEGORIES.NGANH_HANG;
    
    constructor(injector: Injector) {
        this.formBuilder = injector.get(FormBuilder);
        this.notification = injector.get(NotificationService);       
        this.translate = injector.get(CustomTranslateService);
    }

    loadItem(): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {    
        this.createForm();
        if (this.model) {
            this.form.patchValue(this.model);
        }        
        this.loaiTaiKhoan = "canhan";      
    }

    createForm() {
        this.form = this.formBuilder.group({    
            tenDoanhNghiep: [null],
            hoDem: [null,Validators.required],
            Ten: [null,Validators.required],
            userName: [null, Validators.required],
            password: [null, Validators.required],
            email: [null, Validators.compose([
                Validators.email,
                Validators.required])
            ],
            soDienThoai: [null],
            confirmPassword: [null]
        },{ validator: ComparePasswordValidator("password","confirmPassword") });
    }
   
    onChangeType(e): void{
        console.log(1);
        if(e.target.value  == "canhan"){            
            this.form.controls.tenDoanhNghiep.clearValidators();
        }else{
            this.form.controls.tenDoanhNghiep.setValidators([Validators.required]);
        }  
        this.form.controls.tenDoanhNghiep.updateValueAndValidity();
       // this.createForm();
    }

    onSubmit(): void {

        

        if (this.form.invalid) {
            FormUtil.validateAllFormFields(this.form);
            return;
        }

          this.notification.showSuccessMessage(this.translate.get('MES.ACTION.ADD_SUCCESS'));
          console.log(this.form.value)
        //   this.submitFormData(this.action,this.url,this.form.value);
    }
}
