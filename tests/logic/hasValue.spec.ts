import { expect } from 'chai';
import { Control } from 'angular2/common';
import { HasValue } from '../../src/logic/logics/hasValue.logic';

describe('hasValue', function() {
    it('should return false when the control value is undefined', function() {
        let control: Control = new Control();
        control.updateValue(undefined);

        let sut: boolean = HasValue.execute(control);
        expect(sut).eql(false);
    });
});