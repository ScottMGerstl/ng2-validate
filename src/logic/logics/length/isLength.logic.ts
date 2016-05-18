import { AbstractControl } from 'angular2/common';

export class IsLength {
     public static check(control: AbstractControl, length: number): boolean {
        if (control.value.length !== length) {
            return false;
        }

        return true;
    }
}