import { deadLetterProcessor } from '@rproenza/deadletterprocessor';

export const handler = async (event: AWSLambda.SNSEvent, context: AWSLambda.Context) => {
    const result = await deadLetterProcessor(event);
    return result;
};
