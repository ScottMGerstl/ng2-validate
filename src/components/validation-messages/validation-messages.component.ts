import { Component, Input } from 'angular2/core';
import { AbstractControl } from 'angular2/common';
import { ValidationMessageComponent } from './../validation-message/validation-message.component';
import { ValidationMessage } from '../../models/validation-message.model';

@Component({
    selector: 'validation-messages',
    templateUrl: './js/common/validation/components/validation-messages/validation-messages.component.html',
    directives: [ValidationMessageComponent]
})
export class ValidationMessagesComponent {
    @Input() public control: AbstractControl;
    @Input() public exemptKeys: string[];

    public get messages(): Array<ValidationMessage> {
        return this.filterMessages();
    }

    private filterMessages(): Array<ValidationMessage> {
        let result: Array<ValidationMessage> = null;

        if (this.control && this.control.errors && Object.keys(this.control.errors).length > 0) {

            result = [];
            let exemptions = this.exemptKeys ? this.exemptKeys : [];

            for (let key in this.control.errors) {
                if (!exemptions.find(e => e.toLowerCase() === key.toLowerCase())) {
                    result.push(this.control.errors[key]);
                }
            }

            if (result.length === 0) {
                result = null;
            }
        }

        return result;
    }
}