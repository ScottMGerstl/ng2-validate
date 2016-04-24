import 'reflect-metadata';
import { expect } from 'chai';
import { AbstractControl, Control } from 'angular2/common';
import { BaseValidation } from '../models/base.validation';
import { ValidationMessage } from '../models/validation-message.model';
import { ValidationMessages } from '../models/validation-messages.model';
import { IFieldValidation } from '../models/field-validation.interface';
import { IFieldValidatorResult } from '../models/field-validator-result.interface';

class ValidationFak extends BaseValidation<IBaseValidationFakeConfig> implements IFieldValidation {
    constructor(config?: IBaseValidationFakeConfig) {
        super(config);
    }

    public get validator(): (control: AbstractControl) => IFieldValidatorResult {

        return (control: AbstractControl): IFieldValidatorResult => {

            let result: ValidationMessages = new ValidationMessages();

            if (this.config.required === true) {
                result.addMessage('required', `Value is required`, this.config);
            }

            if (this.config.favoriteNumber !== control.value) {
                result.addMessage('favoriteNumber', `Value must be ${this.config.favoriteNumber}`, this.config);
            }

            return result.resolve();
        }
    }

    public getDefaultConfig(): IBaseValidationFakeConfig {
        return {
            required: true,
            favoriteNumber: 42
        };
    }
}

interface IBaseValidationFakeConfig {
    required: boolean;
    favoriteNumber: number;
}

describe('BaseValidation', function() {
    describe('constructor', function() {
        it('should be set to the default values if not config is passed', function() {
            let sut: ValidationFak = new ValidationFak();

            expect(sut.config.required).to.equal(true);
            expect(sut.config.favoriteNumber).to.equal(42);
        });

        it('should accept passed configuration', function() {
            let sut: ValidationFak = new ValidationFak({
                required: false,
                favoriteNumber: 11
            });

            expect(sut.config.required).to.equal(false);
            expect(sut.config.favoriteNumber).to.equal(11);
        });

        it('should default any undefined vales', function() {
            let sut: ValidationFak = new ValidationFak({
                required: false,
                favoriteNumber: undefined
            });

            expect(sut.config.required).to.equal(false);
            expect(sut.config.favoriteNumber).to.equal(42);
        });
    });
});

describe('IFieldValidation', function() {
    describe('ValidationFak', function() {
        it('should have access to config when running', function() {
            let validator: Function = new ValidationFak({required: true, favoriteNumber: 20}).validator;

            let control: Control = new Control();
            control.updateValue(19);

            let sut: ValidationMessages = validator(control);

            expect(sut).not.to.equal(null);
            expect(Object.keys(sut).length).to.equal(2);
            expect((<ValidationMessage>sut['required']).text.length).to.be.above(0);
            expect((<ValidationMessage>sut['favoriteNumber']).text.length).to.be.above(0);
        });
    });
});