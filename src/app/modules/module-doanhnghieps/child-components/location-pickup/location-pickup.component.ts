import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { CustomTranslateService } from '../../../../shared/services/custom-translate.service';
import { SafeAny } from '../../../../shared/utils/types';
import { UrlModuleDoanhNghieps } from '../../data-access/apis/api-list';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'ngx-location-pickup',
    templateUrl: './location-pickup.component.html'
})
export class LocationPickupComponent implements OnInit, OnChanges {
    @Input() idTinhThanh: number = 0;
    @Input() idQuanHuyen: number = 0;
    @Input() idPhuongXa: number = 0;
    @Output() changeOutput = new EventEmitter<Object>();

    private readonly destroy$ = new Subject<void>();
    lstTinhThanh = [];
    lstPhuongXa = [];
    lstQuanHuyen = [];
    urlCategory = UrlModuleDoanhNghieps;
    constructor(
        public translate: CustomTranslateService,
        public apiService: ApiService
    ) { }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.idTinhThanh?.currentValue)
            this.idTinhThanh = changes.idTinhThanh?.currentValue
        if(changes.lstQuanHuyen?.currentValue)
            this.lstQuanHuyen = changes.lstQuanHuyen?.currentValue
        if(changes.lstPhuongXa?.currentValue)
            this.lstQuanHuyen = changes.lstPhuongXa?.currentValue
    }

    ngOnInit() {
      this.loadTinhThanh()
    }
    loadTinhThanh() {
        this.apiService
            .getFullPath(this.urlCategory.ROUTE_CATS.PROVINCE)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: SafeAny) => {
                if (res && res.results) {
                    this.lstTinhThanh = res.results.map((e: SafeAny) => {
                        return {
                            id: e.province_id,
                            text: e.province_name
                        }
                    });
                } else {
                    this.lstTinhThanh = [];
                }
            })
    }

    sendData() {
      this.changeOutput.emit({idTinhThanh: this.idTinhThanh, idQuanHuyen: this.idQuanHuyen, idPhuongXa: this.idPhuongXa})
    }

    loadQuanHuyen() {
        if (this.idTinhThanh > 0) {
            this.apiService
                .getFullPath(this.urlCategory.ROUTE_CATS.DISTRICT + this.idTinhThanh.toString())
                .pipe(takeUntil(this.destroy$))
                .subscribe((res: SafeAny) => {
                    if (res && res.results) {
                        this.lstQuanHuyen = res.results.map((e: SafeAny) => {
                            return {
                                id: e.district_id,
                                text: e.district_name
                            }
                        });
                    } else {
                        this.lstQuanHuyen = [];
                    }
                });
            this.sendData()
        }
    }

    loadPhuongXa() {
        if (this.idQuanHuyen > 0) {
            this.apiService
            .getFullPath(this.urlCategory.ROUTE_CATS.WARD + this.idQuanHuyen.toString())
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: SafeAny) => {
                if (res && res.results) {
                    this.lstPhuongXa = res.results.map((e: SafeAny) => {
                        return {
                            id: e.ward_id,
                            text: e.ward_name
                        }
                    });
                } else {
                    this.lstPhuongXa = [];
                }
            });
            this.sendData()
        }
    }
}


