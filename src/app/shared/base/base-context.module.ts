import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbMenuModule, NbTabsetModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DialogsModule, WindowModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ThemeModule } from '../../@theme/theme.module';
import { ModulesRoutingModule } from '../../modules/modules-routing.module';
import { AlertDialogModule } from '../controls/alert-dialog/alert-dialog.module';
import { NafButtonModule } from '../controls/naf-button/naf-button.module';
import { CKEditorCustomModule } from '../controls/naf-form-control/ckeditor-custom/ckeditor-custom.module';
import { NafFormControlModule } from '../controls/naf-form-control/naf-form-control.module';
import { NafIconModule } from '../controls/naf-icon/naf-icon.module';
import { DefaultValueModule } from '../utils/directives/defaul-value';
import { HideIfUnauthorizedModule } from '../utils/directives/hide-if-unauthorized/hide-if-unauthorized.module';
import { OverflowBodyModule } from '../utils/directives/overflow-body/overflow-body.module';
import { ValidatorRequiredDirectiveModule } from '../utils/directives/validator-required/validator-required.module';
import { TranferIconPipeModule } from '../utils/pipes/icon-svg/tranfer-icon.module';
import { SafeHtmlPipeModule } from '../utils/pipes/safe-html/safe-html.module';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { NafSelectModule } from '../controls/naf-select/naf-select.module';

const LIBs = [
    CommonModule,
    LayoutModule,
    ThemeModule,
    ModulesRoutingModule,
    NbMenuModule,
    TranslateModule,
    NafIconModule,
    NafButtonModule,
    NafFormControlModule,
    TranferIconPipeModule,
    SafeHtmlPipeModule,
    DefaultValueModule,
    ValidatorRequiredDirectiveModule,
    OverflowBodyModule,
    HideIfUnauthorizedModule,
    AlertDialogModule,
    NbWindowModule,
    CKEditorCustomModule,
    GridModule,
    DialogsModule,
    TreeViewModule,
    NbAlertModule,
    NbCardModule,
    NbIconModule,
    NbAccordionModule,
    NbButtonModule,
    ReactiveFormsModule,
    MatMenuModule,
    NbInputModule,
    FormsModule,
    NafSelectModule,
    WindowModule,
    NbFormFieldModule,
    NbTabsetModule,
];


@NgModule({
    exports: [LIBs]
})

// share common
export class BaseContextModule {
}
