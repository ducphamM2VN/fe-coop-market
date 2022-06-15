import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDatepickerModule, NbInputModule, NbPopoverModule } from '@nebular/theme';
import { CKEditorCustomModule } from './ckeditor-custom/ckeditor-custom.module';
import { NafFormControlComponent } from './naf-form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { DefaultValueModule } from '../../utils/directives/defaul-value';
@NgModule({
    declarations: [
        NafFormControlComponent,
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NbInputModule,
        NbDatepickerModule,
        CKEditorModule,
        DefaultValueModule,
        NbPopoverModule,
        CKEditorCustomModule

    ],
    exports     : [
        NafFormControlComponent
    ]
})
export class NafFormControlModule {
}
