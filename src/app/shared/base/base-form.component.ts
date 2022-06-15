import { Directive, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { ActionEnum } from '../../constants/enum.constant';
import { SafeAny } from '../utils/types';

@Directive()
export abstract class BaseFormComponent<T> implements OnInit, OnDestroy {
    @Input() action: ActionEnum;

    @Input() model: T;
    form: FormGroup;

    protected destroyed$ = new Subject();
    protected ref: WindowRef;

    constructor(injector: Injector) {
        this.ref = injector.get(WindowRef);
    }

    ngOnInit(): void {
        this.createForm();
        if (this.model) {
            this.form.patchValue(this.model);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeForm() {
        this.ref.close();
    }

    setFormValue(data: SafeAny) { 
        this.form.patchValue(data);
    }

    abstract onSubmit(): void;

    abstract createForm(): void;
}
