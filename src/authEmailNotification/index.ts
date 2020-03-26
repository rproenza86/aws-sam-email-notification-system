export const handler = async (
    event: AWSLambda.APIGatewayEvent,
    context: AWSLambda.APIGatewayEventRequestContext
) => {
    let response;

    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email notifications authorized' })
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};
