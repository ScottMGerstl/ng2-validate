import { AbstractControl } from 'angular2/common';

export class MinLength {
     public static execute(control: AbstractControl, minLength: number): boolean {
        if (control.value.length < minLength) {
            return false;
        }

        return true;
    }
}