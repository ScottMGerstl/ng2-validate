import { AbstractControl } from '@angular/common';
import { isBlank, isString } from '@angular/core/src/facade/lang';

export class HasValue {
     public static check(control: AbstractControl): boolean {
        if (isBlank(control.value) || (isString(control.value) && control.value.trim() === '')) {
            return false;
        }

        return true;
    }
}