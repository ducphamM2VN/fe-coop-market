import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'naf-icon',
    templateUrl: './naf-icon.component.html',
    styleUrls: ['./naf-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NafIconComponent {
    @Input() icon: string;

}
