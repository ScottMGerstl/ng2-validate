import { AbstractControl } from 'angular2/common';

export class MaxLength {
     public static execute(control: AbstractControl, maxLength: number): boolean {
        if (control.value.length > maxLength) {
            return false;
        }

        return true;
    }
}