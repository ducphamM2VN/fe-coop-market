import {
    Directive,
    Optional,
    Inject,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    Host,
    Renderer2,
    ElementRef,
    OnInit,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { FORM_ERRORS } from './form-errors';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { merge, EMPTY, Observable } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from '../../../services/destroy.service';
import { SafeAny } from '../../types';
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[formControl], [formControlName]',
    providers: [DestroyService],
})
export class ControlErrorsDirective implements OnInit, AfterViewInit, OnDestroy {
    ref: ComponentRef<ControlErrorComponent>;
    container: ViewContainerRef;
    submit$: Observable<Event>;
    @Input() customErrors = {};

    constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() controlErrorContainer: ControlErrorContainerDirective,
        @Inject(FORM_ERRORS) private errors,
        @Optional() @Host() private form: FormSubmitDirective,
        private destroy: DestroyService,
        private controlDir: NgControl
    ) {
        this.container = controlErrorContainer
            ? controlErrorContainer.vcr
            : vcr;
        this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

    ngOnInit() {
        if (!this.control) return;
        merge(this.submit$, this.control.valueChanges)
            .pipe(takeUntil(this.destroy.destroyed$))
            .subscribe((v) => {
                const controlErrors = this.control.errors;

                if (controlErrors) {
                    const firstKey = Object.keys(controlErrors)[0];
                    const getError = this.errors[firstKey];
                    const text =
                        this.customErrors[firstKey] ||
                        getError(controlErrors[firstKey]);
                    this.setError(text);
                } else if (this.ref) {
                    this.setError(null);
                }
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnDestroy() {}

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.validator) {
                const parent = this.el.nativeElement.closest('.form-group');
                if (
                    parent &&
                    parent.getElementsByTagName('LABEL') &&
                    parent.getElementsByTagName('LABEL').length &&
                    !parent.getElementsByClassName('required-asterisk').length
                ) {
                    parent.getElementsByTagName('LABEL')[0].innerHTML +=
                        '<span class="required-asterisk text-danger"> (*)</span>';
                } else {
                    const children = this.el.nativeElement.querySelector(
                        '.form-group'
                    );
                    if (
                        children &&
                        children.getElementsByTagName('LABEL') &&
                        children.getElementsByTagName('LABEL').length &&
                        !children.getElementsByClassName('required-asterisk')
                            .length
                    ) {
                        children.getElementsByTagName('LABEL')[0].innerHTML +=
                            '<span class="required-asterisk text-danger"> (*)</span>';
                    }
                }
            }
        }, 0);
    }

    get control() {
        return this.controlDir.control;
    }

    get validator() {
        if (!this.control) {
            return false;
        }

        if (this.control.validator) {
            const validators = this.control.validator({} as AbstractControl);
            if (validators && validators.required) {
                return true;
            }
        }

        return false;
    }

    setError(text: string) {
        if (!this.ref) {
            const factory = this.resolver.resolveComponentFactory(
                ControlErrorComponent
            );
            const element = this.container.element.nativeElement.querySelector(
                '.control-validator'
            );
            if (element) {
                this.ref = factory.create(this.vcr.injector, null, element);
            } else {
                this.ref = this.container.createComponent(factory);
            }
        }

        this.ref.instance.text = text;
    }

    getParent(element: SafeAny): SafeAny {
        const parent = this.renderer.parentNode(element);
        if (
            parent.getElementsByTagName('FORM').length ||
            parent.getElementsByTagName('BODY').length
        ) {
            return;
        }

        if (!parent.getElementsByTagName('LABEL').length) {
            return this.getParent(parent);
        }

        return parent;
    }
}
