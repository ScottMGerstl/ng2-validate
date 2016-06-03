import { AbstractControl } from '@angular/common';
import { IsPattern } from './isPattern.logic';

export class IsEmail {
    public static check(control: AbstractControl) {
        let pattern: RegExp = /\S+@\S+\.\S+/;
        return IsPattern.check(control, pattern);
    }
}