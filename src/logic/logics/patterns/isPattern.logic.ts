import { AbstractControl } from 'angular2/common';

export class IsPattern {
     public static check(control: AbstractControl, pattern: RegExp): boolean {
        return pattern.test(control.value);
    }
}