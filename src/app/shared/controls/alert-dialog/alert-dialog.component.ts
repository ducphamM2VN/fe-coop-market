import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
})
export class AlertDialogComponent {
    title: string = "Xác nhận";
    message: string = "Bạn có chắc chắn?";
    isNotify: boolean = false;

    constructor(protected ref: NbDialogRef<AlertDialogComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(true);
    }
}
