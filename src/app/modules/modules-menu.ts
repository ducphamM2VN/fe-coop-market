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
    title: 'Danh mục',
    icon: 'book-outline',
    home: true,
    children: [
      {
        title: 'Ngành hàng',
        icon: 'archive-outline',
        link: '/modules/module-categories/nganh-hang',
      },
    ]
  },
  {
    title: 'Cá nhân',
    icon: 'book-outline',
    home: true,
    children: [
      {
        title: 'Cá nhân',
        icon: 'archive-outline',
        link: '/modules/module-canhans/ca-nhan',
      },
    ]
  },
];
