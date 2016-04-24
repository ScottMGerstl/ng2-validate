import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { IsEmail } from '../../logic/logics/patterns/isEmail.logic';

describe('isEmail', function() {
    it('should exist', function() {
        let control: IsEmail = new IsEmail();
    });

    it('should return false when the control does not match the email pattern', function() {
        let control: Control = new Control();
        control.updateValue('not an email');

        let sut: boolean = IsEmail.check(control);
        expect(sut).eql(false);
    });

    it('should return true when the control does match the email pattern', function() {
        let control: Control = new Control();
        control.updateValue('some@thing.com');

        let sut: boolean = IsEmail.check(control);
        expect(sut).eql(true);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(IsEmail.check.bind(control)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(IsEmail.check.bind(control)).to.throw();
    });
});