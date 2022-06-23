import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityUtil } from '../../../../shared/utils/security';
import { SafeAny } from '../../../../shared/utils/types';
import { UrlModuleDoanhNghieps } from '../../data-access/apis/api-list';
import { BaseDoanhNghiepsListComponent } from '../../data-access/base/base-components-list.component';
import { dataExample } from '../../data-access/data-example/data-example';
import { IDoanhNghieps } from '../../data-access/models/doanhnghiep.model';

@Component({
    selector: 'ngx-doanh-nghiep',
    templateUrl: './doanh-nghiep.component.html'
})
export class ComponentDoanhNghiepComponent extends BaseDoanhNghiepsListComponent<IDoanhNghieps> implements OnInit {
    @Input() isChild: boolean;
    urlRouterItem: string = UrlModuleDoanhNghieps.ROUTE_DOANHNGHIEPS.DOANH_NGHIEP;
    gridData = dataExample

    private get extendQueryOptions() {

        return {
            ...this.queryOptions,
        };
    }

    constructor(injector: Injector) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected loadItems(): void {
        // this.load(this.urlApi, {
        //     ...this.body,
        //     ...this.extendQueryOptions
        // });
    }

    addHandler() {
        this.showFormCreateOrUpdate();
    }
    removeHandler(dataItem: SafeAny) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    showFormCreateOrUpdate() {
        const uid = SecurityUtil.encrypted(this.model ? this.model.id.toString() : "0");
        this.router.navigate(['/modules/module-doanhnghieps/form-doanh-nghiep',uid])
    }
}
