import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/common';
import { BaseValidation, ValidationMessages, IFieldValidation, IFieldValidatorResult } from '../src/core';
import { HasValue, IsEmail, MaxLength } from '../src/logic';

// define an interface for configuration
export interface IEmailValidationConfig {
    required: boolean,
    maxLength: number
}

/**
 * create a class that can be imported into a component. This one:
 * extends from the built in BaseValidation class which handles configuration defaulting.
 * implements IFieldValidation which helps standardize validation access and return types
 */
export class EmailValidation extends BaseValidation<IEmailValidationConfig> implements IFieldValidation {

    // accept a configuration. any unspecified values will be defaulted based on getDefaultConfig()
    constructor(config?: IEmailValidationConfig) {
        super(config);
    }

    // returns a function that yields a result equivalent to angular2's ValidatorFn (ValidatorFn is not public)
    public get validator(): (control: AbstractControl) => IFieldValidatorResult {

        return (control: AbstractControl): IFieldValidatorResult => {

            // create a ValidationMessages list
            let result: ValidationMessages = new ValidationMessages();

            // Determine if a value is present. If not, determine if it is required. If required, add a message
            if (HasValue.check(control) === false) {
                if (this.config.required) {
                    result.addMessage('required', `Email is required`, this.config);
                }
            }
            else {

                // If a value is present to be validated, check the length and pattern
                if (MaxLength.check(control, this.config.maxLength) === false) {
                    result.addMessage('maxLength', `Email cannot exceed ${this.config.maxLength} characters`, this.config);
                }

                if (IsEmail.check(control) === false) {
                    result.addMessage('isEmail', `Email must be valid`, this.config);
                }
            }

            // resolve the list
            return result.resolve();
        }
    }

    // implementation of abstract function in BaseValidation
    public getDefaultConfig(): IEmailValidationConfig {
        return EmailValidation.defaultConfig;
    }

    // static access to a default configuration
    public static get defaultConfig(): IEmailValidationConfig {
        return {
            required: true,
            maxLength: 256
        }
    }
}