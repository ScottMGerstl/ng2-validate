import 'reflect-metadata';
import { expect } from 'chai';
import { AbstractControl, Control } from 'angular2/common';
import { BaseValidation } from '../../models/base.validation';
import { ValidationMessages } from '../../models/validation-messages.model';
import { IFieldValidation } from '../../models/field-validation.interface';
import { IFieldValidatorResult } from '../../models/field-validator-result.interface';
import { ValidationMessage } from './../../models/validation-message.model';
import { ValidationMessagesComponent } from './../../components/validation-messages/validation-messages.component';

class ValidationFak implements IFieldValidation {

    public get validator(): (control: AbstractControl) => IFieldValidatorResult {

        return (control: AbstractControl): IFieldValidatorResult => {

            let result: ValidationMessages = new ValidationMessages();

            result.addMessage('one', `message one`, null);
            result.addMessage('two', `message two`, null);

            return result.resolve();
        }
    }
}

describe('ValidationMessagesComponent', function() {

    it('should be constructable', function() {
        let sut: ValidationMessagesComponent = new ValidationMessagesComponent();
    });

    let component: ValidationMessagesComponent;

    beforeEach(function() {
        component = new ValidationMessagesComponent();
    });

    describe('@Input control', function() {
        it('should accept a control', function() {
            component.control = new Control();
            expect(component.control).to.exist;
        });
    });

    describe('@Input messageProperty', function() {
        it('should accept a string', function() {
            component.messageProperty = 'something';
            component.ngOnInit();
            expect(component.messageProperty).to.equal('something');
        });

        it('should default if not provided', function() {
            component.ngOnInit();
            expect(component.messageProperty).to.equal('text');
        });
    });

    describe('@Input exemptKeys', function() {
        it('should accept a string array', function() {
            component.exemptKeys = ['key'];
            expect(component.exemptKeys).to.exist;
            expect(component.exemptKeys.length).to.equal(1);
            expect(component.exemptKeys[0]).to.equal('key');
        });
    });

    describe('messages', function(){
       it('should return null if no messages exist on the control', function() {
            component.control = new Control();
            let sut: Array<ValidationMessage> = component.messages;
            expect(sut).to.equal(null);
       });

       it('should return all messages if no exempt keys were provided', function() {
            component.control = new Control('', new ValidationFak().validator);
            component.control.markAsTouched();

            let sut: Array<ValidationMessage> = component.messages;
            expect(sut.length).to.equal(2);
            expect(sut[0].text).to.equal('message one');
            expect(sut[1].text).to.equal('message two');
       });

       it('should return all messages except ones where exempt keys match', function() {
            component.exemptKeys = ['one'];

            component.control = new Control('', new ValidationFak().validator);
            component.control.markAsTouched();

            let sut: Array<ValidationMessage> = component.messages;
            expect(sut.length).to.equal(1);
            expect(sut[0].text).to.equal('message two');
       });

       it('should return null when all messages match exempt keys', function() {
            component.exemptKeys = ['one', 'two'];

            component.control = new Control('', new ValidationFak().validator);
            component.control.markAsTouched();

            let sut: Array<ValidationMessage> = component.messages;
            expect(sut).to.equal(null);
       });
    });
});