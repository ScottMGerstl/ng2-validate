import { ValidationMessage } from './validation-message.model';
import { IFieldValidatorResult } from './field-validator-result.interface';

export class ValidationMessages {
    private _messages: IFieldValidatorResult;

    constructor() {
        this._messages = {};
    }

    public addMessage(key: string, message: string, context?: any): void {
        this._messages[key] = new ValidationMessage(message, context);
    }

    public resolve(): IFieldValidatorResult {
        if (Object.keys(this._messages).length === 0) {
            return null;
        }

        return Object.assign({}, this._messages);
    }
}