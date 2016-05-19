import { AbstractControl } from '@angular/common';

export class MinLength {
     public static check(control: AbstractControl, minLength: number): boolean {
        if (control.value.length < minLength) {
            return false;
        }

        return true;
    }
}