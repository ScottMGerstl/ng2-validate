import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { HasValue } from '../../logic/logics/hasValue.logic';

describe('hasValue', function() {
    it('should exist', function() {
        let control: HasValue = new HasValue();
    });

    it('should return false when the control value is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(false);
    });

    it('should return false when the control value is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(false);
    });

    it('should return false when the control value is empty', function() {
        let control: Control = new Control();
        control.updateValue('');

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(false);
    });

    it('should return false when the control value is whitespace', function() {
        let control: Control = new Control();
        control.updateValue('   ');

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(false);
    });

    it('should return true when the control value has a string value', function() {
        let control: Control = new Control();
        control.updateValue('im a teapot');

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(true);
    });

    it('should return true when the control value has a number', function() {
        let control: Control = new Control();
        control.updateValue(42);

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(true);
    });
});