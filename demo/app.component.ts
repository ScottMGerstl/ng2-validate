import { Component } from '@angular/core';
import { FormComponent } from './form.component';

@Component({
    selector: 'demo-app',
    template: '<email-form></email-form>',
    directives: [FormComponent]
})
export class AppComponent {
}
