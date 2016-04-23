import { ValidationMessage } from './validation-message.model';

export interface IFieldValidatorResult {
    [key: string]: ValidationMessage
}