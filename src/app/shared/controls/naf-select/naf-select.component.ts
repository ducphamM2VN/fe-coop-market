import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { SafeAny } from '../../utils/types';
import { UrlModuleCategory } from './apis/api-list';
import { CatDanToc, CatGioiTinh, CatQuocTich, CatTonGiao } from './data-access/data-access.categories';
import { DropDownListEnum } from './enums/naf-select.enum';

@Component({
    selector: 'ngx-naf-select',
    templateUrl: './naf-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => NafSelectComponent),
        },
    ],
})
export class NafSelectComponent implements ControlValueAccessor {
    @Input() modeOfDropDownList: DropDownListEnum;
    @Input() isMulti: Boolean = false;
    @Input() label: String;
    @Input() reference: String;
    options: SafeAny;

    urlCategory: SafeAny = UrlModuleCategory;
    value: string;
    lstData = [];
    isDisabled: boolean;
    private readonly destroy$ = new Subject<void>();

    constructor(private apiService: ApiService) { }
    onChange(value) { }

    onTouched: () => void;
    writeValue(obj: SafeAny) {
        this.value = obj;
    }

    registerOnChange(fn: SafeAny) {
        this.onChange = fn;
    }

    registerOnTouched(fn: SafeAny) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.isDisabled = isDisabled;
    }

    handleOnChange(e) {
        if (e != undefined) {
            this.writeValue(e);
            this.onChange(e);
        }
    }
    ngOnInit() {
        this.options = {
            multiple: this.isMulti,
            tags: this.isMulti,
            width: '100%'
        };
        switch (this.modeOfDropDownList) {
            case DropDownListEnum.DAN_TOC:
                this.loadDanToc()
                break;
            case DropDownListEnum.TON_GIAO:
                this.loadTonGiao()
                break;
            case DropDownListEnum.QUOC_TICH:
                this.loadQuocTich()
                break;
        }
    }

    loadApiCategory(url: string) {
        this.apiService
            .get(url)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: SafeAny) => {
                if (res && res.items) {
                    this.lstData = res.items.map((e: SafeAny) => {
                        return {
                            id: e.id,
                            text: e.name
                        }
                    });
                } else {
                    this.lstData = [];
                }
            });
    }
    loadDanToc() {
        this.lstData = CatDanToc.map(item => {
            return {
                id: item.id,
                text: item.name
            }
        })
    }
    loadGioiTinh() {
        this.lstData = CatGioiTinh.map(item => {
            return {
                id: item.id,
                text: item.name
            }
        })
    }
    loadTonGiao() {
        this.lstData = CatTonGiao.map(item => {
            return {
                id: item.id,
                text: item.name
            }
        })
    }
    loadQuocTich() {
        this.lstData = CatQuocTich.map(item => {
            return {
                id: item.id,
                text: item.name
            }
        })
    }
}
