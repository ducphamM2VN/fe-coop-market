import { SafeAny } from "../shared/utils/types";


export const AppConstant = {
    VERSION: Math.floor(Math.random() * 999999),
    NO_AVATAR_URL: './assets/images/no-avatar.jpg',
    CURRENT_LANG: 'lang',
    TITLE: 'Thông báo',
    TYPE: {
        SUCCESS: 'success',
        DANGER: 'danger',
        WARNING: 'warning',
    },
    NO_IMAGE_URL: '',
};

export const FOLDER = {
    HINH_DAI_DIEN: 'NS_HinhNhanSu',
    FOLDER_FUNCTION: 'Upload',
};

export const PageConfig = {
    buttonCount: 5,
    pageSizes: [10, 20, 50],
    previousNext: true,
};

export const PageConfigExtra = {
    buttonCount: 5,
    pageSizes: [50, 100, 150, 300],
    previousNext: true,
};

export const ModalDeleteConfig = {
    title: 'Bạn có muốn xóa dòng này ?',
    content: '<b style="color: red;">Xác nhận xóa</b>',
    yes: 'Đồng ý',
    no: 'Không',
};

export const ReziseTable = 140;

export const SubFolder: SafeAny = {
    APTN: 'APTN',
    AKHCN: 'AKHCN',
    KHCN: 'KHCN',
};

export const BADGE_SIDEBAR = {
    NBL_DUYET_DON_VI: 'badge_nbl_duyetcapdonvi',
    NBL_DUYET_BAN_TCCB: 'badge_nbl_duyetcapban',
    DGNS_PHIEU_DANH_GIA: 'badge_xl_phieudanhgia'
}
