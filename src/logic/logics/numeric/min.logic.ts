import { AbstractControl } from 'angular2/common';

export class Min {
     public static check(control: AbstractControl, min: number): boolean {
        if (isNaN(+control.value) === true) {
            throw new Error(`"${control.value}" is not a number"`);
        }

        if (+control.value < min) {
            return false;
        }

        return true;
    }
}