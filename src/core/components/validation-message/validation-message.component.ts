import { Component, Input } from 'angular2/core';

@Component({
    selector: 'validation-message',
    templateUrl: './js/common/validation/components/validation-message/validation-message.component.html'
})
export class ValidationMessageComponent {
    @Input() public message: string;
}