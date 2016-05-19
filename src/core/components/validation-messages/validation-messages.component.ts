import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/common';
import { ValidationMessageComponent } from './../validation-message/validation-message.component';
import { ValidationMessage } from '../../models/validation-message.model';

@Component({
    selector: 'validation-messages',
    template: `
    <div *ngIf="messages" *ngFor="#message of messages">
        <validation-message *ngIf="message" [message]="message[messageProperty]"></validation-message>
    </div>`
    ,
    directives: [ValidationMessageComponent]
})
export class ValidationMessagesComponent implements OnInit {
    @Input() public control: AbstractControl;
    @Input() public exemptKeys: string[];
    @Input() public messageProperty: string;

    public ngOnInit(): void {
        this.messageProperty = this.messageProperty || 'text';
    }

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