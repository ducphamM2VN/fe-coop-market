import { InjectionToken, ValueProvider } from '@angular/core';
import { SafeAny } from '../../../shared/utils/types';

export const APP_ROLE_OPTION = new InjectionToken<SafeAny>(
    'naf-nx.config'
);

export const getRoleProvider = (
    value: SafeAny
): ValueProvider => ({
    provide: APP_ROLE_OPTION,
    useValue: value,
});
