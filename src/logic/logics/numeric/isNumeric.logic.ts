import { AbstractControl } from 'angular2/common';

export class IsNumeric {
     public static check(control: AbstractControl): boolean {
        if (control.value === undefined || control.value === null || control.value instanceof Object || isNaN(+control.value) === true) {
            return false;
        }

        return true;
    }
}