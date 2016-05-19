import { AbstractControl } from '@angular/common';
import { IFieldValidatorResult } from './field-validator-result.interface';

export interface IFieldValidation {
    validator: (control: AbstractControl) => IFieldValidatorResult;
}