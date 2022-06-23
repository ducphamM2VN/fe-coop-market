export interface IDoanhNghieps {
  id: number;
  hoTen: string;
  soCMND: number;
  ngaySinh: Date;
  gioiTinh: boolean;
  idDanToc: string;
  idTonGiao: string;
  idQuocTich: number;
  tenDoanhNghiep:string;
  idLoaiHinh: string;
  namThanhLap:Date;
  vonDieuLe:number;
  nguoiLienHe:string;
  chucVuNguoiLienHe:string;
  sdtNguoiLienHe:number;
  emailNguoiLienHe:string;
  moHinhKinhDoanhs: IMoHinhKinhDoanh[];
  dienTich: number;
  giaThueDeNghi: number;
  tenTienTe: number;
  thoiGianMo: Date;
  cacVanDeKhac: string;
}
export interface IMoHinhKinhDoanh {
  id: number;
  idNganhHang: number;
  thuongHieu: string;
  idDoTuoi: number;
  idDoiTuongKhachHang: number;
  idThuNhap: number;
  giaTrungBinhTu: number;
  giaTrungBinhDen: number;
  idXuatXu: number; //enum
  noiBatkhacBiet: string;
  idHoSoLoaiHinh: number;
  idHoSoXuatXu: number;
  idHoSoChungMinhNhapKhau: number;
  doanhThuTrungBinhTu: number;
  doanhThuTrungBinhDen: number;
  dienTichToiThieu: number;
  dienTichToiDa: number;
  dacDiemViTri: string;
  kieuGianHang: boolean;
  giaThueChapNhan: number;
  idTienTe: number;
  idViTriCuahang: number;
  soLuongCuaHang: number;
  cuaHangDaCo: string;
  cuaHangDuKien: string;
  viTriQuanTamMoCuaHang: string;
  yeuCauDatBiet: string; //enum
  idThoiGianThietKeTB: number;
  idThoiGianThiCongTB: number;
  yeuCauMarketing: string;
}

