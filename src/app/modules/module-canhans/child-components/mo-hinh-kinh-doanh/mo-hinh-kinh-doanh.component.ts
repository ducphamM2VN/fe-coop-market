import { Component, Injector, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DropDownListEnum } from '../../../../shared/controls/naf-select/enums/naf-select.enum';
import { BaseCaNhansFormComponent } from '../../data-access/base/base-components-form.component';
import { IMoHinhKinhDoanh } from '../../data-access/models/canhan.model';

@Component({
  selector: 'ngx-mo-hinh-kinh-doanh',
  templateUrl: './mo-hinh-kinh-doanh.component.html',
})
export class MoHinhKinhDoanhComponent  extends BaseCaNhansFormComponent<IMoHinhKinhDoanh> implements OnInit {
  @Input() moHinhKinhDoanhs: IMoHinhKinhDoanh
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          id: [0, Validators.required],
          idNganhHang: [0, Validators.required],
          thuongHieu: [null],
          idDoTuoi: [0, Validators.required],
          idDoiTuongKhachHang: [0, Validators.required],
          idThuNhap: [0, Validators.required],
          giaTrungBinhTu: [null],
          giaTrungBinhDen: [null],
          idXuatXu: [0, Validators.required],
          noiBatkhacBiet: [null],
          idHoSoLoaiHinh: [0, Validators.required],
          idHoSoXuatXu: [0, Validators.required],
          idHoSoChungMinhNhapKhau: [0, Validators.required],
          doanhThuTrungBinhTu: [null],
          doanhThuTrungBinhDen: [null],
          dienTichToiThieu: [null],
          dienTichToiDa: [null],
          dacDiemViTri: [null],
          kieuGianHang: [null],
          giaThueChapNhan: [null],
          idTienTe: [0, Validators.required],
          idViTriCuahang: [0, Validators.required],
          soLuongCuaHang: [null],
          cuaHangDaCo: [null],
          cuaHangDuKien: [null],
          viTriQuanTamMoCuaHang: [null],
          yeuCauDatBiet: [null],
          idThoiGianThietKeTB: [0, Validators.required],
          idThoiGianThiCongTB: [0, Validators.required],
          yeuCauMarketing: [null],
      });
  }

  onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  createForm(): void {
    throw new Error('Method not implemented.');
  }
  protected showFormCreateOrUpdate(): void {
    throw new Error('Method not implemented.');
  }
  protected loadItems(): void {
    throw new Error('Method not implemented.');
  }
}
