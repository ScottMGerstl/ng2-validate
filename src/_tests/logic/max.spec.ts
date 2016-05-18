import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { Max } from '../../logic/logics/numeric/max.logic';

describe('max', function() {
    it('should exist', function() {
        let control: Max = new Max();
    });

    it('should return true when the control is less than max', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = Max.check(control, 2);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to max', function() {
        let control: Control = new Control();
        control.updateValue('2');

        let sut: boolean = Max.check(control, 2);
        expect(sut).eql(true);
    });

    it('should return false when the control is greater than max', function() {
        let control: Control = new Control();
        control.updateValue('3');

        let sut: boolean = Max.check(control, 2);
        expect(sut).eql(false);
    });

    it('should throw Error when the control is non-numeric string', function() {
        let control: Control = new Control();
        control.updateValue('s');

        expect(Max.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is date', function() {
        let control: Control = new Control();
        control.updateValue(new Date());

        expect(Max.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(Max.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(Max.check.bind(control, 2)).to.throw();
    });
});