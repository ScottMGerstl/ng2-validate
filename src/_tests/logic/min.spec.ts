import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from '@angular/common';
import { Min } from '../../logic/logics/numeric/min.logic';

describe('min', function() {
    it('should exist', function() {
        let control: Min = new Min();
    });

    it('should return false when the control is less than min', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = Min.check(control, 2);
        expect(sut).eql(false);
    });

    it('should return true when the control is equal to min', function() {
        let control: Control = new Control();
        control.updateValue('2');

        let sut: boolean = Min.check(control, 2);
        expect(sut).eql(true);
    });

    it('should return true when the control is greater than min', function() {
        let control: Control = new Control();
        control.updateValue('3');

        let sut: boolean = Min.check(control, 2);
        expect(sut).eql(true);
    });

    it('should throw Error when the control is non-numeric string', function() {
        let control: Control = new Control();
        control.updateValue('s');

        expect(Min.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is date', function() {
        let control: Control = new Control();
        control.updateValue(new Date());

        expect(Min.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(Min.check.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(Min.check.bind(control, 2)).to.throw();
    });
});