import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActionEnum } from '../../../../../constants/enum.constant';
import { FormUtil } from '../../../../../shared/utils/formvalidate';
import { UrlModuleCategories } from '../../../data-access/apis/api-list';
import { BaseDangKyFormComponent } from '../../../data-access/base/base-components-form.component';
import { ICategories } from '../../../data-access/models/category.model';

@Component({
  selector: 'ngx-form-nganh-hang',
  templateUrl: './form-nganh-hang.component.html'
})
export class FormNganhHangComponent extends BaseDangKyFormComponent<ICategories> implements OnInit {

  url: String = UrlModuleCategories.ROUTE_CATEGORIES.NGANH_HANG;
  loadItem(): void {
      throw new Error('Method not implemented.');
  }

  constructor(injector: Injector) { super(injector) }

  ngOnInit() {
      super.ngOnInit();
      switch (this.action) {
          case ActionEnum.CREATE:
              break;
          case ActionEnum.UPDATE:
              this.setFormValue(this.model);
              break;
      }
  }
  createForm() {
      this.form = this.formBuilder.group({
          id: [0, Validators.required],
          ten: [null, Validators.required],
          soThuTu: [null],
          moTa: [null, Validators.required],
          ghiChu: [null],
      });
  }

  onSubmit(): void {
      if (this.form.invalid) {
          FormUtil.validateAllFormFields(this.form);
          return;
      }
      this.submitFormData(this.action,this.url,this.form.value);
  }

}

