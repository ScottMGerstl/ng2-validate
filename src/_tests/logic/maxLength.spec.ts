import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { MaxLength } from '../../logic/logics/maxLength.logic';

describe('maxLength', function() {
    it('should exist', function() {
        let control: MaxLength = new MaxLength();
    });

    it('should return true when the control is less than maxLength', function() {
        let control: Control = new Control();
        control.updateValue('1');

        let sut: boolean = MaxLength.execute(control, 2);
        expect(sut).eql(true);
    });

    it('should return true when the control is equal to maxLength', function() {
        let control: Control = new Control();
        control.updateValue('12');

        let sut: boolean = MaxLength.execute(control, 2);
        expect(sut).eql(true);
    });

    it('should return false when the control is greater than maxLength', function() {
        let control: Control = new Control();
        control.updateValue('123');

        let sut: boolean = MaxLength.execute(control, 2);
        expect(sut).eql(false);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(MaxLength.execute.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(MaxLength.execute.bind(control, 2)).to.throw();
    });
});