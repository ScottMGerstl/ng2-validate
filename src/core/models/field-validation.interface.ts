import { AbstractControl } from 'angular2/common';
import { IFieldValidatorResult } from './field-validator-result.interface';

export interface IFieldValidation {
    validator: (control: AbstractControl) => IFieldValidatorResult;
}