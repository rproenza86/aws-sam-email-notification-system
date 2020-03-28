export const createEmailParams = (message: string) => {
    // Replace sender@example.com with your "From" address.
    // This address must be verified with Amazon SES.
    const sender = 'Codex Man <codex@raulproenza.page>';

    // Replace recipient@example.com with a "To" address. If your account
    // is still in the sandbox, this address must be verified.
    // valid email
    const recipient = 'rproenza86@gmail.com';

    // use to test bounce
    // const recipient = 'bounce@simulator.amazonses.com';

    // use to test complaint
    // const recipient = 'complaint@simulator.amazonses.com';

    // Specify a configuration set. If you do not want to use a configuration
    // set, comment the following variable, and the
    // ConfigurationSetName : configuration_set argument below.
    const configuration_set = 'ConfigSet';

    // The subject line for the email.
    const subject = 'Amazon SES Test (AWS SDK for JavaScript in Node.js)';

    // The email body for recipients with non-HTML email clients.
    const body_text =
        `${message}\r\n` +
        'This email was sent with Amazon SES using the ' +
        'AWS SDK for JavaScript in Node.js.';

    // The HTML body of the email.
    const body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;

    // The character encoding for the email.
    const charset = 'UTF-8';

    // Specify the parameters to pass to the API.
    const params = {
        Source: sender,
        Destination: {
            ToAddresses: [recipient]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        }
        // ConfigurationSetName: configuration_set
    };

    return params;
};
