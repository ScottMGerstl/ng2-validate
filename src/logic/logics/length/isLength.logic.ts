import { AbstractControl } from '@angular/common';

export class IsLength {
     public static check(control: AbstractControl, length: number): boolean {
        if (control.value.length !== length) {
            return false;
        }

        return true;
    }
}