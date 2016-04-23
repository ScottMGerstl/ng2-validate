import { AbstractControl } from 'angular2/common';

export class IsPattern {
     public static execute(control: AbstractControl, pattern: RegExp): boolean {
        return pattern.test(control.value);
    }
}