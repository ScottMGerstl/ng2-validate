import { AbstractControl } from '@angular/common';

export class MaxLength {
     public static check(control: AbstractControl, maxLength: number): boolean {
        if (control.value.length > maxLength) {
            return false;
        }

        return true;
    }
}