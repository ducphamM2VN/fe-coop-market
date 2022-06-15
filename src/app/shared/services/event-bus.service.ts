import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SafeAny } from '../utils/types';

@Injectable({
    providedIn: 'root',
})
export class EventBusService {
    private subject$ = new Subject();

    /**
     * On event bus service
     * @param event
     * @param action
     * @returns on
     */
    on(event: EventBus, action: SafeAny): Subscription {
        return this.subject$
            .pipe(
                filter((e: SafeAny) => e.name === event),
                map((e: EmitEvent) => e.value)
            )
            .subscribe(action);
    }

    emit(event: EmitEvent) {
        this.subject$.next(event);
    }
}

export class EmitEvent {
    constructor(public name: SafeAny, public value?: SafeAny) {
    }
}

export enum EventBus {
    MenuState,
}
