export interface ICaNhans {
  id: number;
  hoTen: string;
  soCMND: number;
  ngaySinh: Date;
  tenGioiTinh: boolean;
  danToc: string;
  tonGiao: string;
  quocTich: number;
  diaChi: string;
  tenPhuongXa: number;
  tenQuanHuyen: number;
  tenTinhThanh: number;
  nguoiLienHe: string;
  chucVu: string;
  dienThoai: string;
  email: string;
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
  tuoiTu: number;
  tuoiDen: number;
  idDoiTuongKhachHang: number;
  thuNhapTu: number;
  thuNhapDen: number;
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
