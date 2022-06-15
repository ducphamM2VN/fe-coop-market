import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { IKeyOption } from '../../../data-access';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[HideIfUnauthorized]'
})
export class MyHideIfUnauthorizedDirective implements OnInit {
    @Input('HideIfUnauthorized') key: string; // Required permission passed in
    roleOfOption: IKeyOption[] = [];

    constructor(
        private el: ElementRef, 
        //private menuService: MenuService
        ) { }

    ngOnInit() {
        // const menus = this.menuService.getMenuStorage();
        // this.roleOfOption = menus[0].options;
        // if (!this.roleOfOption.find(m => m.key === this.key)) {
        //     this.el.nativeElement.style.display = 'none';
        // }
    }
}
