import AWS from 'aws-sdk';

/**
 * AWS SSM Client to fetch bot and API credentials stored in AWS Parameter
 * Store, part of AWS Systems Manager for EC2 instances
 */
class SSMClient {
    client: AWS.SSM = new AWS.SSM({ region: 'us-west-1' });

    async getParameter(query: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.getParameter(
                {
                    Name: query,
                    WithDecryption: true,
                },
                (err, data) => {
                    if (err) reject(err.stack);
                    else resolve(data.Parameter?.Value as string);
                }
            );
        });
    }
}

const ssmClient = new SSMClient();
export default ssmClient;
