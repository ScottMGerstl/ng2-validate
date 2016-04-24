import 'reflect-metadata';
import { expect } from 'chai';
import { ValidationMessageComponent } from './../../core/components/validation-message/validation-message.component';

describe('ValidationMessageComponent', function() {

    it('should be constructable', function() {
        let sut: ValidationMessageComponent = new ValidationMessageComponent();
    });

    let component: ValidationMessageComponent;

    beforeEach(function() {
        component = new ValidationMessageComponent();
    });

    describe('@Input message', function() {
        it('should accept a value', function() {
            component.message = 'this is a test';
            expect(component.message).to.equal('this is a test');
        });
    });
});