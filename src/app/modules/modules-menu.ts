import { NbMenuItem } from '@nebular/theme';


//Link ICON: https://akveo.github.io/eva-icons/#/
export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Tổng quan',
  //   icon: 'home-outline',
  //   link: '/modules/module-student/dashboard',
  //   home: true,
  // },
  {
    title: 'Đăng ký',
    icon: 'book-outline',
    home: true,
    children: [
      {
        title: 'Ngành hàng',
        icon: 'archive-outline',
        link: '/modules/module-dang-ky/nganh-hang',
      },
    ]
  },
  {
    title: 'Khách hàng Cá nhân',
    icon: 'people-outline',
    home: true,
    children: [
      {
        title: 'Quản lý thông tin đăng ký',
        icon: 'monitor-outline',
        link: '/modules/module-canhans/ca-nhan',
      },
    ]
  },
];
