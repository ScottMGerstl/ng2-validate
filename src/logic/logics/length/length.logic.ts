import { AbstractControl } from 'angular2/common';

export class Length {
     public static check(control: AbstractControl, minLength: number, maxLength: number): boolean {
        if (control.value.length < minLength || control.value.length > maxLength) {
            return false;
        }

        return true;
    }
}