import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { MinLength } from '../../logic/logics/minLength.logic';

describe('minLength', function() {
    it('should exist', function() {
        let control: MinLength = new MinLength();
    });

    it('should return false when the control is less than minLength', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = MinLength.check(control, 2);
        expect(sut).eql(false);
    });

    it('should return true when the control is equal to minLength', function() {
        let control: Control = new Control();
        control.updateValue('12');

        let sut: boolean = MinLength.check(control, 2);
        expect(sut).eql(true);
    });

    it('should return true when the control is greater than minLength', function() {
        let control: Control = new Control();
        control.updateValue('123');

        let sut: boolean = MinLength.check(control, 2);
        expect(sut).eql(true);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(MinLength.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(MinLength.check.bind(control, 2)).to.throw();
    });
});