import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnChangeType, OnTouchedType, SafeAny } from '../../utils/types';
import { config } from './ckeditor-config/ckeditor.config';

export type NafFormControlType =
    | 'input'
    | 'color'
    | 'number'
    | 'textarea'
    | 'date'
    | 'checkbox'
    | 'password'
    | 'ckeditor';
export type NafFormControlMode = 'vertical' | 'horizontal';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector       : 'naf-form-control',
    templateUrl    : './naf-form-control.component.html',
    styleUrls      : ['./naf-form-control.component.scss'],
    providers      : [
        {
            provide    : NG_VALUE_ACCESSOR,
            multi      : true,
            useExisting: forwardRef(() => NafFormControlComponent)
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NafFormControlComponent implements OnInit, OnChanges, ControlValueAccessor {
    inputValue: string | number | boolean;

    @Input() label: string;
    @Input() note: string;
    @Input() value: string | number | boolean;
    @Input() placeHolder = '';
    @Input() type: NafFormControlType = 'input';
    @Input() mode: NafFormControlMode = 'vertical';
    @Input() isDisabled = false;
    @Input() step = 1;
    @Input() max: number;
    @Input() min = 0;
    @Input() rows = 3;
    @Input() disabledDate = null;
    @Input() col: string; // 2-10 3-9
    @Input() editorConfig: SafeAny;
    @Input() modeOfCkeditor = 'divarea';
    ckConfig = config.other1Option;


    leftCol: string;
    rightCol: string;
    @Input('col')
    set updateCols(value: string) {
        if (value) {
            this.leftCol = `col-lg-${this.col.split('-')[0]}`;
            this.rightCol = `col-lg-${this.col.split('-')[1]}`;
        }
    }

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
      if (!changes.value?.firstChange && changes.value?.currentValue !== changes.value?.previousValue) {
        this.writeValue(this.value)
      }
    }

    ngOnInit() {
        this.setValue(this.value);
    }

    onChange: OnChangeType = () => {
        // code here
    };
    onTouched: OnTouchedType = () => {
        // code here
    };

    registerOnChange(fn: OnChangeType): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: OnTouchedType): void {
        this.onTouched = fn;
    }

    writeValue(value: string | number | boolean): void {
        this.inputValue = value;
        this.setValue(value);
        this.cdr.detectChanges();
    }

    setDisabledState(disabled: boolean): void {
        this.isDisabled = disabled;
        this.cdr.markForCheck();
    }

    onInputChange($event) {
        const value = $event.target.value;
        this.onModelChange(value);
    }

    onModelChange(value: SafeAny) {
        this.setValue(value);
    }

    setValue(value: string | number | boolean): void {
        this.inputValue = value;
        this.cdr.detectChanges();
        this.onChange(value);
    }
}
