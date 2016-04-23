import { AbstractControl } from 'angular2/common';
import { isBlank, isString } from 'angular2/src/facade/lang';

export class HasValue {
     public static execute(control: AbstractControl): boolean {
        if (isBlank(control.value) || (isString(control.value) && control.value === '')) {
            return false;
        }

        return true;
    }
}