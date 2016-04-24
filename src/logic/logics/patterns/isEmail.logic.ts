import { AbstractControl } from 'angular2/common';
import { IsPattern } from './IsPattern.logic';

export class IsEmail {
    public static check(control: AbstractControl) {
        let pattern: RegExp = /\S+@\S+\.\S+/;
        return IsPattern.check(control, pattern);
    }
}