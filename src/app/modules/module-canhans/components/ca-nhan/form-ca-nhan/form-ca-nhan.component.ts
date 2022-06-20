import { Component, Injector, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActionEnum } from "../../../../../constants/enum.constant";
import { UrlModuleCaNhans } from "../../../data-access/apis/api-list";
import { BaseCaNhansFormComponent } from "../../../data-access/base/base-components-form.component";
import { ICaNhans } from "../../../data-access/models/canhan.model";

@Component({
    selector: "ngx-form-ca-nhan",
    templateUrl: "./form-ca-nhan.component.html",
})
export class FormCaNhanComponent extends BaseCaNhansFormComponent<ICaNhans> implements OnInit {
    loadItem(): void { }
    url: String = UrlModuleCaNhans.ROUTE_CANHANS.CA_NHAN;

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
        this.form = this.formBuilder.group({
            id: [0, Validators.required],
            hoTen: [null, Validators.required],
            soCMND: [null, Validators.required],
            ngaySinh: [null, Validators.required],
            gioiTinh: [null, Validators.required],
            idDanToc: [null, Validators.required],
            idTonGiao: [null, Validators.required],
            idQuocTich: [null, Validators.required],
            diaChi: [null, Validators.required],
            idPhuongXa: [null, Validators.required],
            idQuanHuyen: [null, Validators.required],
            idTinhThanh: [null, Validators.required],
            nguoiLienHe: [null],
            chucVu: [null],
            dienThoai: [null, Validators.required],
            email: [null],
            dienTich: [null, Validators.required],
            giaThueDeNghi: [null, Validators.required],
            tenTienTe: [null, Validators.required],
            thoiGianMo: [null, Validators.required],
            cacVanDeKhac: [null],
        });
    }

    onSubmit() {
        if (!this.form.invalid) {
            return;
        }
        this.submitFormData(this.action, this.url, this.form.value);
    }
    returnLocation(data) {
        this.form.get('idTinhThanh').setValue = data.idTinhThanh
        this.form.get('idQuanHuyen').setValue = data.idQuanHuyen
        this.form.get('idPhuongXa').setValue = data.idPhuongXa

        console.log(this.form.value)
    }
}
