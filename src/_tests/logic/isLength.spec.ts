import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { IsLength } from '../../logic/logics/length/isLength.logic';

describe('isLength', function() {
    it('should exist', function() {
        let control: IsLength = new IsLength();
    });

    it('should return false when the control is less than length', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = IsLength.check(control, 2);
        expect(sut).eql(false);
    });

    it('should return true when the control is equal to length', function() {
        let control: Control = new Control();
        control.updateValue('12');

        let sut: boolean = IsLength.check(control, 2);
        expect(sut).eql(true);
    });

    it('should return false when the control is greater than length', function() {
        let control: Control = new Control();
        control.updateValue('123');

        let sut: boolean = IsLength.check(control, 2);
        expect(sut).eql(false);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(IsLength.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(IsLength.check.bind(control, 2)).to.throw();
    });
});