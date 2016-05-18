import { AbstractControl } from 'angular2/common';

export class Range {
     public static check(control: AbstractControl, minValue: number, maxValue: number): boolean {
        if (isNaN(+control.value) === true) {
            throw new Error(`"${control.value}" is not a number"`);
        }

        if (+control.value < minValue || +control.value > maxValue) {
            return false;
        }

        return true;
    }
}