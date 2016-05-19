import { AbstractControl } from '@angular/common';

export class Max {
     public static check(control: AbstractControl, max: number): boolean {
        if (isNaN(+control.value) === true) {
            throw new Error(`"${control.value}" is not a number"`);
        }

        if (+control.value > max) {
            return false;
        }

        return true;
    }
}