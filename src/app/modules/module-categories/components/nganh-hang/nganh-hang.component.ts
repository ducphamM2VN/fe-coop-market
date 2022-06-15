import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { SafeAny } from '../../../../shared/utils/types';
import { UrlModuleCategories } from '../../data-access/apis/api-list';
import { BaseCategoriesListComponent } from '../../data-access/base/base-components-list.component';
import { ICategories } from '../../data-access/models/category.model';
import { FormNganhHangComponent } from './form-nganh-hang/form-nganh-hang.component';

@Component({
    selector: 'ngx-nganh-hang',
    templateUrl: './nganh-hang.component.html'
})
export class ComponentNganhHangComponent extends BaseCategoriesListComponent<ICategories> implements OnInit {
    @Input() isChild: boolean;
    urlRouterItem: string = UrlModuleCategories.ROUTE_CATEGORIES.NGANH_HANG;
    private get extendQueryOptions() {
        return {
            ...this.queryOptions,
        };
    }

    constructor(injector: Injector, private router: Router) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected loadItems(): void {
        this.load(this.urlApi, {
            ...this.body,
            ...this.extendQueryOptions
        });
    }
    removeHandler(dataItem: SafeAny) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    protected showFormCreateOrUpdate(): void {
      this.opened = true;
      const windowRef = this.windowService.open({
          title: this.getActionName(this.action),
          content: FormNganhHangComponent,
          width: 800,
          top: 100,
          autoFocusedElement: 'body',
      });
      const param = windowRef.content.instance;
      param.action = this.action;
      param.model = this.model;

      windowRef.result.subscribe(result => {
          if (result instanceof WindowCloseResult) {
              this.opened = false;
              this.loadItems();
          }
      });
  }
}
