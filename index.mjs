
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

export const handler = async (event) => {
    console.log("Received event:", JSON.stringify(event, null, 2)); 

    
    const errorCode = event.errorCode;
    if (errorCode === 'AccessDenied') {
        console.log("Access Denied event detected! Triggering alert...");

        const snsClient = new SNSClient({ region: 'us-east-1' });
        const snsParams = {
            Message: JSON.stringify(event), 
            TopicArn: 'arn:aws:sns:us-east-1:123456789012:SecurityAlerts', 
        };

        try {
            const data = await snsClient.send(new PublishCommand(snsParams));
            console.log("SNS notification sent successfully:", data);
        } catch (error) {
            console.error("Error sending SNS notification:", error);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'AccessDenied event handled and alert sent!',
                event,
            }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Event received but no action required.',
            event,
        }),
    };
};
