import { Component, OnInit } from '@angular/core';
import { Control, ControlGroup } from '@angular/common';
import { ValidationMessagesComponent } from '../src/core';
import { EmailValidation } from './email.validator';

@Component({
    directives: [ValidationMessagesComponent],
    selector: 'email-form',
    template: `
        <div [ngFormModel]="myForm">
            <label>Email</label>
            <input [(ngFormControl)]="emailControl" [(ngModel)]="email"/>
            <validation-messages [control]="emailControl"></validation-messages>
        </div>
    `
})
export class FormComponent implements OnInit {
    private myForm: ControlGroup;
    private emailControl: Control;

    private email: string;

    public ngOnInit(): void {
        this.emailControl = new Control('', new EmailValidation().validator);

        this.myForm = new ControlGroup({
            emailControl: this.emailControl
        });
    }
}