import { Directive, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { DropDownListEnum } from '../../../../shared/controls/naf-select/enums/naf-select.enum';
import { ActionEnum, CulturesEnum } from '../../../../constants/enum.constant';
import { ApiService } from '../../../../shared/services/api.service';
import { NotificationService } from '../../../../shared/services/notification.service';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseDoanhNghiepsPopupComponent<T>
    implements OnInit, OnDestroy {
    @Input() model: T;
    @Input() cultureId: CulturesEnum;
    @Input() action: ActionEnum;
    form: FormGroup;
    hostName = location.origin;
    dropdownListEnum = DropDownListEnum;
    modelVietnamese: T;

    protected destroyed$ = new Subject();
    protected apiService: ApiService;
    protected formBuilder: FormBuilder;
    protected notification: NotificationService;
    protected ref: WindowRef;

    constructor(injector: Injector) {
        this.apiService = injector.get(ApiService);
        this.formBuilder = injector.get(FormBuilder);
        this.notification = injector.get(NotificationService);
        this.ref = injector.get(WindowRef);
    }

    ngOnInit(): void {
        this.createForm();
        if (this.model && this.cultureId) {
            this.loadItem();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.ref.close();
    }

    abstract onSubmit(): void

    abstract loadItem(): void

    abstract createForm(): void
}
