import { AbstractControl } from 'angular2/common';
import { isBlank, isString } from 'angular2/src/facade/lang';

export class HasValue {
     public static check(control: AbstractControl): boolean {
        if (isBlank(control.value) || (isString(control.value) && control.value.trim() === '')) {
            return false;
        }

        return true;
    }
}