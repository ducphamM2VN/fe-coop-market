import { Directive, Injector, OnInit } from '@angular/core';
import { ActionType } from '../../../constants/enum.constant';
import { IKeyOption } from '../../../shared/data-access';
import { MenuService } from '../../../shared/states/menu/menu.service';
import { AppConfigEnv } from '../../../web-config/configs';
import { ListRoleOption } from '../models/user-role-option';

@Directive()
export abstract class BaseCheckPermission implements OnInit {
    roles = {
        isView: false,
        isCreate: false,
        isUpdate: false,
        isDelete: false,
    };

    roleOfOption: IKeyOption[] = [];
    listRoleOption = ListRoleOption;
    // isLang = AppConfigEnv.settings.isLang;

    // protected menuService: MenuService;
    constructor(
        injector: Injector
    ) {
        // this.menuService = injector.get(MenuService);
    }

    ngOnInit() {
        // const permissions = this.menuService.getPermissionWithCurrentUrl();
        // if (permissions.includes(ActionType.VIEW)) {
        //     this.roles.isView = true;
        // }

        // if (permissions.includes(ActionType.CREATE)) {
        //     this.roles.isCreate = true;
        // }

        // if (permissions.includes(ActionType.DELETE)) {
        //     this.roles.isDelete = true;
        // }

        // if (permissions.includes(ActionType.UPDATE)) {
        //     this.roles.isUpdate = true;
        // }
    }

    // isHasPermission(key: string) {
    //     const menus = this.menuService.getMenuStorage();
    //     this.roleOfOption = menus[0].options;
    //     return !!this.roleOfOption.find(m => m.key === key);
    // }
}
