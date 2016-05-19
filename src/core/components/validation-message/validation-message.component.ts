import { Component, Input } from '@angular/core';

@Component({
    selector: 'validation-message',
    template: `
    <section *ngIf="message">
        {{message}}
    </section>
    `
})
export class ValidationMessageComponent {
    @Input() public message: string;
}