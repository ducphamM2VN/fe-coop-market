import { Component, Injector, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NbWindowService } from "@nebular/theme";
import { WindowRef } from "@progress/kendo-angular-dialog";
import { ActionEnum } from "../../../../../constants/enum.constant";
import { ApiService } from "../../../../../shared/services/api.service";
import { NotificationService } from "../../../../../shared/services/notification.service";
import { FormUtil } from "../../../../../shared/utils/formvalidate";
import { UrlModuleCaNhans } from "../../../data-access/apis/api-list";
import { BaseCaNhansFormComponent } from "../../../data-access/base/base-components-form.component";
import { ICaNhans } from "../../../data-access/models/canhan.model";
import { CaNhanService } from "../../../services/canhan";

@Component({
  selector: "ngx-form-ca-nhan",
  templateUrl: "./form-ca-nhan.component.html",
})
export class FormCaNhanComponent extends BaseCaNhansFormComponent<ICaNhans> implements OnInit
{
  loadItem(): void {}
  url: String = UrlModuleCaNhans.ROUTE_CANHANS.CA_NHAN;
  protected caNhanService: CaNhanService;

  constructor(injector: Injector) {
    super(injector);
  }

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
    debugger;
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      hoTen: ["gvsadgvas", Validators.required],
      soCMND: ["dvghcvhds", Validators.required],
      //   ngaySinh: ['',],
      //   tenGioiTinh: ['', Validators.required],
      //   danToc: ['', Validators.required],
      //   tonGiao: ['', Validators.required],
      //   quocTich: ['', Validators.required],
      //   diaChi: ['', Validators.required],
      //   tenPhuongXa: ['', Validators.required],
      //   tenQuanHuyen: ['', Validators.required],
      //   tenTinhThanh: ['', Validators.required],
      //   nguoiLienHe: ['', Validators.required],
      chucVu: ["dsufuyg", Validators.required],
      dienThoai: ["hsbvdsf", Validators.required],
      email: ["jsdhvfgvds", Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      debugger;
      this.caNhanService.create(this.form.value).subscribe(() => {
        this.closeForm();
      });
      return;
    }
    console.log(this.form);

    this.submitFormData(this.action, this.url, this.form.value);
  }
}
