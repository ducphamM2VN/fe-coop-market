import { Observable, Subject } from 'rxjs';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Directive, HostListener, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { ActionEnum, ActionType } from '../../constants/enum.constant';
import { ReziseTable } from '../../constants/app.constant';
import { SafeAny } from '../utils/types';
import { BaseCheckPermission } from '../../auth/data-access/abstract/base-check-permission';

@Directive()
export abstract class BaseListComponent<T> extends BaseCheckPermission implements OnInit, OnDestroy {
    @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
    actionType = ActionType;

    opened = false;
    gridView$: Observable<GridDataResult>;
    gridState: State = {
        sort: [{
            field: 'id',
            dir  : 'desc'
        }],
        skip: 0,
        take: 10
    };
    isLoading = false;

    pageConfig: PagerSettings | false = false;
    selectionIds: number[] = [];


    searchControl = new FormControl();
    isSearchAdvanced = false;
    isSearchFirsttime = false;

    model: T | null;
    action: ActionEnum;
    pageHeight = window.innerHeight - ReziseTable + 10;
    protected destroyed$ = new Subject();

    constructor(injector: Injector) {
        super(injector);
    }

    protected get queryOptions() {
        return {
            pageNumber: this.gridState.skip / this.gridState.take + 1,
            pageSize  : this.gridState.take,
            keyword   : this.searchControl.value,
            sortCol   : this.gridState.sort[0].field,
            isAsc     : this.gridState.sort[0].dir === 'asc'
        };
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: SafeAny): void {
        this.pageHeight = event.target.innerHeight - ReziseTable + 12;
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * Adds handler
     */
    addHandler() {
        this.model = null;
        this.action = ActionEnum.CREATE;
        this.showFormCreateOrUpdate();
    }

    copyHandler(dataItem: SafeAny) {
        this.model = dataItem;
        this.action = ActionEnum.DUPLICATE;
        this.showFormCreateOrUpdate();
    }

    /**
     * Edits handler
     * @param dataItem
     */
    editHandler(dataItem: SafeAny) {
        this.model = dataItem;
        this.action = ActionEnum.UPDATE;
        this.showFormCreateOrUpdate();
    }

    onStateChange(state: State) {
        this.gridState = state;
        this.loadItems();
    }

    onSearchChange() {
        this.gridState.skip = 0;
        this.loadItems();
    }

    onToggleSearchAdvanced() {
        this.isSearchFirsttime = true;
        const el = document.querySelector('.search-backdrop');
        if (!el) {
            return;
        }
        this.isSearchAdvanced = !this.isSearchAdvanced;
        if (this.isSearchAdvanced) {
            el.classList.add('search-overlay');
        } else {
            el.classList.remove('search-overlay');
        }
    }

    refresh() {
        this.loadItems();
    }

    protected abstract showFormCreateOrUpdate(): void;

    protected abstract loadItems(): void;
}
