#ng2-validate

a collection of classes and components to slim down your component templates for handling error messages on your form.
This is done by binding your control (containing a validator) to the validation-messages component.

This is based off the [ValidatorFn](https://github.com/angular/angular/blob/master/modules/angular2/src/common/forms/directives/validators.ts#L51) interface defined by the beta-14 release. it will work with older versions of angular2 as long as it follows that same interface definition

##Example
Here is a simple component that imports the validation-messsages component into the directives and creates a simple form with one control for email
(the specific implementation of the EmailValidation class is defined further in the documentation):
```javascript
import { Component, OnInit } from 'angular2/core';
import { Control, ControlGroup } from 'angular2/common';
import { ValidationMessagesComponent } from 'ng2-validate/core';
import { EmailValidation } from './down/in/this/readme/email.validation.ts';

@Component({
    directives: [ValidationMessagesComponent, ...]
    ...
})
export class MyComponent implements OnInit{
    private myForm: ControlGroup;
    private emailControl: Control;

    private email: string;

    public ngOnInit(): void {
        this.myControl = new Control('', new EmailValidation().validator);

        this.myForm = new ControlGroup({
            emailControl: this.emailControl
        });
    }

    private get shouldShowMessages(control: Control): boolean {
        return /*you condition for showing the messages*/;
    }
}
```

Here we have the simple template that uses the validation-messages component. The control is bound to it and the component will handle rendering out messages.
```html
<div [ngFormModel]="myForm">
    <label>Email</label>
    <input [(ngFormControl)]="emailControl" [(ngModel)]="email"/>
    <validation-messages [control]="emailControl" *ngIf="shouldShowMessages(emailControl)"></validation-messages>
</div>
```

## Components

### **validation-messages Component**
This is the collection level component for rendering out any number of messages the control will yield during validation.

Bindings
* **[control]: AbstractControl** - specify a control, who's messages the instance should display.
* **[messageProprty]: string (optional | default = "text")** - specify a key in the message object to access for the message text.
* **[exemptKeys]: string[] (optional)** - specify any validation keys you would not like to show in the list. This is not something you would commonly do but it is available if you want to display different errors for a control in different parts of the page

### **validation-message Component**
This is the component that renders the actual message for each validation message. This is used by the list but can also be used independantly.

Bindings
* **[message]: string** - the message to show

## Models
There are a couple built in models you can use depending on how you want to construct your validation. The below models integration seamlessly into the validation-messages component above.

### **ValidationMessage.ts**
This model holds the information about the validation message.

Properties
* **text: string** - property to contain the human readble information about the validation error
* **context: any (optional)** - property to contain any information you want to supply with the validation message (such as the validation configuration for debugging and testing).

### **ValidationMessages.ts**
This is a list model that represents a collection of ValidationMessage.

Functions
* **add(key, message, context?): void** adds a message to the colleaction
    * **key: string** - the key that identifies the validation message (e.g. minLength)
    * **message: string** - the human readable text of the validation message
    * **context: any (optional)** - any information you want to add to the object for debugging or testing assertion

* **resolve(): ValidationMessages** - if there are messages, it returns them; if not, it returns null so truthy in html evaluates to false

## Validation Logic
These components are built so that you can use your favorite validation framework as long as the result of the validation lines up with angular's [ValidatorFn](https://github.com/angular/angular/blob/master/modules/angular2/src/common/forms/directives/validators.ts#L51).
However, there are some built in validation logic classes that you can use; I referenced a couple in the component above.
I will be adding to the logic classes over time and will definitely take pull requests to grow the available library of those logic files.

Current available logic:
* **HasValue.check(control: AbstractControl): boolean** - determines if a control contains a value
* **MaxLength.check(control: AbstractControl, maxLength: number): boolean** - determines if a control value's length is less than or equal to the maxLength provided
* **MinLength.check(control: AbstractControl, minLength: number): boolean** - determines if a control value's length is greater than or equal to the minLength provided
* **IsPattern.check(control: AbstractControl, pattern: RegExp): boolean** - determines if a control's value passes the RegExp.test() method
* **IsEmail.check(control: AbstractControl): boolean** - determines if a control's value looks similar to an email


## Control Validators
Here is a suggested way to design your validation as it gives the view model control of what validation should be shown rather than the view.
There are out of the box classes and interfaces *(explained in the snippet)* you can make use of to make building control validators easier and quicker.

```javascript
import { Injectable } from 'angular2/core';
import { AbstractControl } from 'angular2/common';
import { BaseValidation, ValidationMessages, IFieldValidation, IFieldValidatorResult } from 'ng2-validate/core';
import { HasValue, IsEmail, MaxLength } from 'ng2-validate/logic';

// define an interface for configuration
export interface IEmailValidationConfig {
    required: boolean,
    maxLength: number
}

/**
 * create a class that can be imported into a component. This one:
 * extends from the built in BaseValidation class which handles configuration defaulting.
 * implements IFieldValidation which helps standardize validation access and return types
 */
export class EmailValidation extends BaseValidation<IEmailValidationConfig> implements IFieldValidation {

    // accept a configuration. any unspecified values will be defaulted based on getDefaultConfig()
    constructor(config?: IEmailValidationConfig) {
        super(config);
    }

    // returns a function that yields a result equivalent to angular2's ValidatorFn (ValidatorFn is not public)
    public get validator(): (control: AbstractControl) => IFieldValidatorResult {

        return (control: AbstractControl): IFieldValidatorResult => {

            // create a ValidationMessages list
            let result: ValidationMessages = new ValidationMessages();

            // Determine if a value is present. If not, determine if it is required. If required, add a message
            if (HasValue.check(control) === false) {
                if (this.config.required) {
                    result.addMessage('required', `Email is required`, this.config);
                }
            }
            else {

                // If a value is present to be validated, check the length and pattern
                if (MaxLength.check(control, this.config.maxLength) === false) {
                    result.addMessage('maxLength', `Email cannot exceed ${this.config.maxLength} characters`, this.config);
                }

                if (IsEmail.check(control) === false) {
                    result.addMessage('isEmail', `Email must be valid`, this.config);
                }
            }

            // resolve the list
            return result.resolve();
        }
    }

    // implementation of abstract function in BaseValidation
    public getDefaultConfig(): IEmailValidationConfig {
        return EmailValidation.defaultConfig;
    }

    // static access to a default configuration
    public static get defaultConfig(): IEmailValidationConfig {
        return {
            required: true,
            maxLength: 256
        }
    }
}
```