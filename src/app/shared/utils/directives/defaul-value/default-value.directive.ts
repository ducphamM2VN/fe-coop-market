import { NgControl } from '@angular/forms';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[nullValue]'
})
export class NullDefaultValueDirective {
    constructor(private el: ElementRef, private control: NgControl) {
    }

    @HostListener('input', ['$event.target'])
    onEvent(target: HTMLInputElement) {
        this.control.viewToModelUpdate((target.value === '') ? null : Number.parseFloat(target.value));
    }
}
