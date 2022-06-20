import { Directive, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { Subject } from 'rxjs';
import { ActionEnum, CulturesEnum } from '../../../../constants/enum.constant';
import { BaseFormComponent } from '../../../../shared/base/base-form.component';
import { config } from '../../../../shared/controls/naf-form-control/ckeditor-config/ckeditor.config';
import { DropDownListEnum } from "../../../../shared/controls/naf-select/enums/naf-select.enum";
import { ApiService } from '../../../../shared/services/api.service';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { SecurityUtil } from '../../../../shared/utils/security';
import { IFileDinhKem } from '../models/base.model';

@Directive()
export abstract class BaseDangKyFormComponent<T> extends BaseFormComponent<T>
    implements OnInit, OnDestroy {
    @Input() model: T;
    tabCurrentIndex = 0;
    form: FormGroup;
    hostName = location.origin;
    dropdownListEnum = DropDownListEnum;
    isVietnamese = true;
    modelVietnamese: T;

    fileList: IFileDinhKem[] = [];
    arrIdsExclude: number[] = [];
    configCkeditor = config.other1Option

    protected destroyed$ = new Subject();

    protected apiService: ApiService;
    protected formBuilder: FormBuilder;
    protected notification: NotificationService;
    protected modal: NbWindowService;
    protected route: ActivatedRoute;
    protected windowRef: WindowRef;
    protected translate: CustomTranslateService;



    constructor(injector: Injector) {
        super(injector)
        this.apiService = injector.get(ApiService);
        this.formBuilder = injector.get(FormBuilder);
        this.notification = injector.get(NotificationService);
        this.modal = injector.get(NbWindowService);
        this.route = injector.get(ActivatedRoute);
        this.windowRef = injector.get(WindowRef);
        this.translate = injector.get(CustomTranslateService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.createForm();
        if (!this.action) {
            this.action = this.model ? ActionEnum.UPDATE : ActionEnum.CREATE;
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    // showMediaPopup() {
    //     const modal = this.modal.open({
    //         nzTitle        : 'Quản lý file',
    //         nzContent      : CmsMediaComponent,
    //         nzWidth        : 1200,
    //         nzWrapClassName: 'modal-media',
    //         // nzViewContainerRef: this.viewContainerRef,
    //         nzComponentParams: {},
    //         nzOnOk           : () => new Promise((resolve) => setTimeout(resolve, 1000)),
    //         nzFooter         : []
    //     });

    //     modal.afterClose.pipe().subscribe((result) => {
    //         if (result && result.files && result.files.length > 0) {
    //             const files = result.files.map((x) => {
    //                 return {
    //                     idFile : x.id,
    //                     tenFile: x.tenFile
    //                 };
    //             });

    //             this.fileList = this.fileList.concat(files);
    //         }
    //     });
    // }

    onRemoveFile(index: number) {
        this.fileList.splice(index, 1);
    }

    closeForm() {
        this.windowRef.close();
    }

    get cultureId(): CulturesEnum {
        return Number.parseInt(this.route.snapshot.queryParams['cultureId'], 10);
    }

    get id(): number {
        try {
            return Number.parseInt(
                SecurityUtil.get(
                    decodeURIComponent(this.route.snapshot.queryParams['data'])
                ),
                10
            );
        } catch (e) {
            return 0;
        }
    }

    abstract onSubmit(): void

    abstract createForm(): void

    abstract loadItem(): void

    changeTabIndex(event) {
        this.tabCurrentIndex = event.index;
    }

    submitFormData(action, url, body){
        switch (action) {
            case ActionEnum.CREATE:
                this.apiService
                    .post(url, body)
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.ACTION.ADD_SUCCESS'));
                        // close form
                        this.closeForm();
                    });
                break;
            case ActionEnum.UPDATE:
                this.apiService
                    .put(url + '/' + body.id.toString(), body)
                    .subscribe(res => {
                        // show notification
                        this.notification.showSuccessMessage(this.translate.get('MES.ACTION.UPDATE_SUCCESS'));
                        // close form
                        this.closeForm();
                    });
                break;
        }
    }
}

