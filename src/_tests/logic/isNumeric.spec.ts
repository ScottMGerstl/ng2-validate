import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { IsNumeric } from '../../logic/logics/numeric/isNumeric.logic';

describe('min', function() {
    it('should exist', function() {
        let control: IsNumeric = new IsNumeric();
    });

    it('should return true when the control is positive decimal', function() {
        let control: Control = new Control();
        control.updateValue('0.4');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(true);
    });

    it('should return true when the control is positive whole number', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(true);
    });

    it('should return true when the control is 0', function() {
        let control: Control = new Control();
        control.updateValue('0');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(true);
    });

    it('should return true when the control is negative whole number', function() {
        let control: Control = new Control();
        control.updateValue('-1');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(true);
    });

    it('should return true when the control is negative decimal', function() {
        let control: Control = new Control();
        control.updateValue('-0.4');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(true);
    });

    it('should return false when the control is non-numeric string', function() {
        let control: Control = new Control();
        control.updateValue('s');

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(false);
    });

    it('should return false when the control is date', function() {
        let control: Control = new Control();
        control.updateValue(new Date());

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(false);
    });

    it('should return false when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(false);
    });

    it('should return false when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        let sut: boolean = IsNumeric.check(control);
        expect(sut).eql(false);
    });
});