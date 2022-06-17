import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '../../../../constants/enum.constant';
import { SafeAny } from '../../../../shared/utils/types';
import { UrlModuleCaNhans } from '../../data-access/apis/api-list';
import { BaseCaNhansListComponent } from '../../data-access/base/base-components-list.component';
import { dataExample } from '../../data-access/data-example/data-example';
import { ICaNhans } from '../../data-access/models/canhan.model';
import { FormCaNhanComponent } from './form-ca-nhan/form-ca-nhan.component';

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

    constructor(injector: Injector, private router: Router) {
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
        this.model = null;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();

    }
    removeHandler(dataItem: SafeAny) {
        this.selectionIds = [];
        this.selectionIds.push(dataItem.id);
        this.removeSelectedHandler();
    }
    showFormCreateOrUpdate() {
      this.opened = true;
      const windowRef = this.windowService.open({
          title: this.getActionName(this.action),
          content: FormCaNhanComponent,
          width: 800,
          height:700,
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
