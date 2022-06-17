import { Directive, Injector } from '@angular/core';
import { finalize, map, takeUntil, tap } from 'rxjs/operators';
import { WindowService } from '@progress/kendo-angular-dialog';
import { BaseListComponent } from '../../../../shared/base/base-list.component';
import { ApiService } from '../../../../shared/services/api.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { NbDialogService } from '@nebular/theme';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { ActionEnum, CulturesEnum } from '../../../../constants/enum.constant';
import { DropDownListEnum } from '../../../../shared/controls/naf-select/enums/naf-select.enum';
import { SafeAny } from '../../../../shared/utils/types';
import { IPagedResult } from '../../../../shared/data-access';
import { PageConfig } from '../../../../constants/app.constant';
import { Subject } from 'rxjs';
import { AlertDialogComponent } from '../../../../shared/controls/alert-dialog/alert-dialog.component';
import { SelectionEvent } from '@progress/kendo-angular-grid';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseCaNhansListComponent<T> extends BaseListComponent<T> {
    protected apiService: ApiService;
    protected windowService: WindowService;
    protected notification: NotificationService;
    protected modal: NbDialogService;
    protected translate: CustomTranslateService;

    constructor(injector: Injector) {
        super(injector);
        this.apiService = injector.get(ApiService);
        this.windowService = injector.get(WindowService);
        this.notification = injector.get(NotificationService);
        this.modal = injector.get(NbDialogService);
        this.translate = injector.get(CustomTranslateService);
    }

    culturesEnum = CulturesEnum;
    cultureId: CulturesEnum;
    dropdownListEnum = DropDownListEnum;
    destroy$ = new Subject<void>();
    urlApi: string;
    colNameDefineClass: string='col-12 col-lg-12 col-md-12';
    isInfoOpen:boolean = false;
    infoModel: T | null;

    protected get body() {

        return {
            ...this.queryOptions

        };
    }

    protected load(url: string, body: SafeAny) {
        this.isLoading = true;
        this.gridView$ = this.apiService.post(url, body).pipe(
            map((res: IPagedResult<T[]>) => {
                if (res && res.items) {
                    return {
                        data: res.items,
                        total: res.total
                    };
                } else {
                    return {
                        data: [],
                        total: 0
                    };
                }
            }),
            tap((res) => {
                if (res.total <= this.gridState.take) {
                    this.pageConfig = false;
                } else {
                    this.pageConfig = PageConfig;
                }
            }),
            finalize(() => (this.isLoading = false))
        );
    }

    addHandler() {
        this.model = null;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }


    removeSelectedHandler() {
        const body = {
            ids: this.selectionIds
        };
        this.modal.open(AlertDialogComponent, {
            context: {
                title: this.translate.get('MES.ACTION.DEL_TITLE'),
                message: this.translate.get('MES.ACTION.DEL_CONFIRM'),
            },
        }).onClose
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                if (res) {
                    if (this.selectionIds.length > 0) {
                        const body = [...new Set(this.selectionIds)]
                        this.apiService.delete(this.urlApi + '/many', body).subscribe(res => {
                            this.selectionIds = [];
                            this.notification.showSuccessMessage(this.translate.get('MES.ACTION.DEL_SUCCESS'));
                            this.loadItems();
                        });
                    }
                }
            });
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    setInfoTab(){
        if(!this.isInfoOpen){
            if(this.selectionIds.length > 0){
                this.isInfoOpen = true;
                this.colNameDefineClass = 'col-9 col-lg-9 col-md-8';
            }else{
                this.isInfoOpen = false;
                this.colNameDefineClass = 'col-12 col-lg-12 col-md-12';
            }
        }else{
            this.isInfoOpen = false;
            this.colNameDefineClass = 'col-12 col-lg-12 col-md-12';
        }
    }

    selectedRowChange(e: SelectionEvent) {
        try{
            this.model = e.selectedRows[0].dataItem;
            this.infoModel = e.selectedRows[0].dataItem;
        }catch{
            this.isInfoOpen = false;
            this.setInfoTab();
        }
    }

    getActionName(action: Number) {
        let result = '';
        switch (action) {
            case ActionEnum.CREATE:
                result = this.translate.get('LB.GRID.THEM_MOI');
                break;
            case ActionEnum.UPDATE:
                result = this.translate.get('LB.GRID.CHINH_SUA');
                break;
            case ActionEnum.VIEW:
                result = this.translate.get('LB.GRID.XEM');
                break;
        }
        return result;
    }

    returnNumberArray(data: SafeAny){
        if(data && data.length > 0)
            return data.map(i=>Number(i));
        return [];
    }
    returnStringArray(data: SafeAny){
        if(data && data.length > 0)
            return data.map(i=>String(i));
        return [];
    }
}
