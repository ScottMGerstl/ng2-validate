import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { Length } from '../../logic/logics/length/length.logic';

describe('length', function() {
    it('should exist', function() {
        let control: Length = new Length();
    });

    it('should return false when the control is less than lower bound', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = Length.check(control, 2, 4);
        expect(sut).eql(false);
    });

    it('should return true when the control is equal to lower bound', function() {
        let control: Control = new Control();
        control.updateValue('22');

        let sut: boolean = Length.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is in length', function() {
        let control: Control = new Control();
        control.updateValue('333');

        let sut: boolean = Length.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to upper bound', function() {
        let control: Control = new Control();
        control.updateValue('4444');

        let sut: boolean = Length.check(control, 2, 4);
        expect(sut).eql(true);
    });

    it('should return false when the control is greater than upper bound', function() {
        let control: Control = new Control();
        control.updateValue('55555');

        let sut: boolean = Length.check(control, 2, 4);
        expect(sut).eql(false);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(Length.check.bind(control, 2, 4)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(Length.check.bind(control, 2, 4)).to.throw();
    });
});