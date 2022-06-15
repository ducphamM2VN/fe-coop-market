import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'naf-button',
    templateUrl: './naf-button.component.html',
    styleUrls: ['./naf-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NafButtonComponent implements OnInit {
    @Input() btnText: string;
    @Input() btnIconSvg: string;
    @Input() btnIconClass: string;
    @Input() btnClass: string;
    @Input() isDisabled = false;
    @Input() isSubmit = false;
    
    constructor() {
    }

    ngOnInit(): void {
    }

    haltDisabledEvents(event: MouseEvent): void {
        if (this.isDisabled && (event.target as HTMLElement)?.tagName === 'A') {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
    }

}
