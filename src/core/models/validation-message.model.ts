export class ValidationMessage {
    public text: string;
    public context: any;

    constructor(message: string, context?: any) {
        this.text = message;
        this.context = context;
    }
}