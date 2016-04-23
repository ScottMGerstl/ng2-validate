import 'reflect-metadata';
import { expect } from 'chai';
import { Control } from 'angular2/common';
import { IsPattern } from '../../logic/logics/patterns/isPattern.logic';

describe('isPattern', function() {
    it('should exist', function() {
        let control: IsPattern = new IsPattern();
    });

    it('should return false when the control does not match the pattern', function() {
        let control: Control = new Control();
        control.updateValue('a');

        let sut: boolean = IsPattern.execute(control, new RegExp('[A-Z]'));
        expect(sut).eql(false);
    });

    it('should return true when the control does match the pattern', function() {
        let control: Control = new Control();
        control.updateValue('A');

        let sut: boolean = IsPattern.execute(control, new RegExp('[A-Z]'));
        expect(sut).eql(true);
    });

    it('should throw Error when the control is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        expect(IsPattern.execute.bind(control, 2)).to.throw();
    });

    it('should throw Error when the control is null', function() {
        let control: Control = new Control();
        control.updateValue(null);

        expect(IsPattern.execute.bind(control, 2)).to.throw();
    });
});