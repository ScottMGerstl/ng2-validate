import 'reflect-metadata';
import { expect } from 'chai';
import { ValidationMessage } from './../../src/core/models/validation-message.model';
import { ValidationMessages } from './../../src/core/models/validation-messages.model';
import { IFieldValidatorResult } from './../../src/core/models/field-validator-result.interface';

describe('ValidationMessages', function() {

    let messages: ValidationMessages;

    beforeEach(function() {
        messages = new ValidationMessages();
    });

    describe('addMessage then resolve', function() {
        it('should return null if no messages were added', function() {
            let sut: IFieldValidatorResult = messages.resolve();
            expect(sut).to.equal(null);
        });

        it('should return the messages that were added', function() {

            messages.addMessage('required', 'this is a required message', { here: true });
            messages.addMessage('is42', 'this should have been 42');

            let sut: IFieldValidatorResult = messages.resolve();

            expect(sut).not.to.equal(null);

            expect((<ValidationMessage>sut['required']).text).to.equal('this is a required message');
            expect((<ValidationMessage>sut['required']).context.here).to.equal(true);

            expect((<ValidationMessage>sut['is42']).text).to.equal('this should have been 42');
            expect((<ValidationMessage>sut['is42']).context).to.equal(undefined);
        });

        it('should not mutate the results', function() {

            messages.addMessage('required', 'this is a required message');
            let sut1: IFieldValidatorResult = messages.resolve();

            messages.addMessage('is42', 'this should have been 42');
            let sut2: IFieldValidatorResult = messages.resolve();

            expect(Object.keys(sut1).length).to.equal(1);
            expect(Object.keys(sut2).length).to.equal(2);
        });
    });
});