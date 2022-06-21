import { Component, Injector, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { ActionEnum } from "../../../../../constants/enum.constant";
import { UrlModuleCaNhans } from "../../../data-access/apis/api-list";
import { BaseCaNhansFormComponent } from "../../../data-access/base/base-components-form.component";
import { ICaNhans, IMoHinhKinhDoanh } from "../../../data-access/models/canhan.model";

@Component({
    selector: "ngx-form-ca-nhan",
    templateUrl: "./form-ca-nhan.component.html",
})
export class FormCaNhanComponent extends BaseCaNhansFormComponent<ICaNhans> implements OnInit {
    url: String = UrlModuleCaNhans.ROUTE_CANHANS.CA_NHAN;
    moHinhKinhDoanhs: IMoHinhKinhDoanh[] = []
    soLuongCuaHang: number = 0
    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        switch (this.action) {
            case ActionEnum.CREATE:
                break;
            case ActionEnum.UPDATE:
                this.form.patchValue(this.model);
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
            moHinhKinhDoanhs: [],
            soLuongCuaHang: 0,
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
    protected showFormCreateOrUpdate(): void {
    }
    protected loadItems(): void {
    }
    updateSoLuongMoHinhKinhDoanh(data) {
      this.moHinhKinhDoanhs = []
      for (let i = 1; i <= data; i++) {
          this.moHinhKinhDoanhs.push({
              id: 0,
              idNganhHang: 0,
              thuongHieu: null,
              idDoTuoi: 0,
              idDoiTuongKhachHang: 0,
              idThuNhap: 0,
              giaTrungBinhTu: null,
              giaTrungBinhDen: null,
              idXuatXu: 0,
              noiBatkhacBiet: null,
              idHoSoLoaiHinh: 0,
              idHoSoXuatXu: 0,
              idHoSoChungMinhNhapKhau: 0,
              doanhThuTrungBinhTu: null,
              doanhThuTrungBinhDen: null,
              dienTichToiThieu: null,
              dienTichToiDa: null,
              dacDiemViTri: null,
              kieuGianHang: null,
              giaThueChapNhan: null,
              idTienTe: 0,
              idViTriCuahang: 0,
              soLuongCuaHang: null,
              cuaHangDaCo: null,
              cuaHangDuKien: null,
              viTriQuanTamMoCuaHang: null,
              yeuCauDatBiet: null,
              idThoiGianThietKeTB: 0,
              idThoiGianThiCongTB: null,
              yeuCauMarketing: null
          })
        }
    }
}
