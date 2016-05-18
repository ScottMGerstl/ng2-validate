import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { Range } from '../../logic/logics/numeric/range.logic';

describe('range', function() {
    it('should exist', function() {
        let control: Range = new Range();
    });

    it('should return false when the control is less than lower bound', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(false);
    });

    it('should return true when the control is equal to lower bound', function() {
        let control: Control = new Control();
        control.updateValue('2');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to lower bound as decimal', function() {
        let control: Control = new Control();
        control.updateValue('2.0');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is in range', function() {
        let control: Control = new Control();
        control.updateValue('3');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is in range as decimals', function() {
        let control: Control = new Control();
        control.updateValue('2.2');

        let sut: boolean = Range.check(control, 2.1, 2.3);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to upper bound', function() {
        let control: Control = new Control();
        control.updateValue('4');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to upper bound as decimal', function() {
        let control: Control = new Control();
        control.updateValue('4.0');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return false when the control is greater than upper bound', function() {
        let control: Control = new Control();
        control.updateValue('5');

        let sut: boolean = Range.check(control, 2, 4);
        expect(sut).eql(false);
    });

    it('should throw Error when the control is non-numeric string', function() {
        let control: Control = new Control();
        control.updateValue('s');

        expect(Range.check.bind(control, 2, 4)).to.throw();
    });

    it('should throw Error when the control is date', function() {
        let control: Control = new Control();
        control.updateValue(new Date());

        expect(Range.check.bind(control, 2, 4)).to.throw();
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(Range.check.bind(control, 2, 4)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(Range.check.bind(control, 2, 4)).to.throw();
    });
});