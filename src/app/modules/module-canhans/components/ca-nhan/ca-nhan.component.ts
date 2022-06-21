import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeAny } from '../../../../shared/utils/types';
import { UrlModuleCaNhans } from '../../data-access/apis/api-list';
import { BaseCaNhansListComponent } from '../../data-access/base/base-components-list.component';
import { dataExample } from '../../data-access/data-example/data-example';
import { ICaNhans } from '../../data-access/models/canhan.model';

@Component({
    selector: 'ngx-ca-nhan',
    templateUrl: './ca-nhan.component.html'
})
export class ComponentCaNhanComponent extends BaseCaNhansListComponent<ICaNhans> implements OnInit {
    @Input() isChild: boolean;
    urlRouterItem: string = UrlModuleCaNhans.ROUTE_CANHANS.CA_NHAN;
    gridData = dataExample

    private get extendQueryOptions() {

        return {
            ...this.queryOptions,
        };
    }

    constructor(injector: Injector,
        private router: Router) {
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
        this.router.navigate(['/modules/module-canhans/form-ca-nhan', encodeURIComponent(this.model ? this.model.id : 0)])
    }
}
