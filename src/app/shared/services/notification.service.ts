import { Injectable } from '@angular/core';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { AppConstant } from '../../constants/app.constant';

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor(
        private toastr: NbToastrService
    ) {
    }


    /**
     * Creates notification
     * @param title
     * @param content
     */
    createNotification(status: NbComponentStatus,title: string, content: string): void {
        this.toastr.show(content,title,{status});
    }

    /**
     * Shows error message
     * @param mes
     */
    showSuccessMessage(mes: string): void {
        this.toastr.show(mes,AppConstant.TITLE,{status:'info'});
    }

    /**
     * Shows error message
     * @param mes
     */
    showErrorMessage(mes: string): void {
        this.toastr.show(mes,AppConstant.TITLE,{status:'danger'});
    }

    showWarningMessage(mes: string) {
        this.toastr.show(mes,AppConstant.TITLE,{status:'warning'});
    }
}
