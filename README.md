# Simple AWS IoT JS SDK Publish Example
This is a stripped-down example of using the AWS IoT JS V2 SDK to send messages to AWS IoT Core.

## Getting Started
1. Create an IoT Policy that looks like:

    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "iot:Connect",
                "Resource": "arn:aws:iot:<YOUR_REGION>:<YOUR_ACCOUNT_ID>:client/js-sdk-example"
            },
            {
                "Effect": "Allow",
                "Action": "iot:Publish",
                "Resource": "arn:aws:iot:<YOUR_REGION>:<YOUR_ACCOUNT_ID>:topic/hello-world"
            }
        ]
    }
    ```
    Replace `YOUR_REGION` and `YOUR_ACCOUNT_ID` with the appropriate values. This will allow your device to connect to IoT Core as long as it's using a client ID of `js-sdk-example` and it's only publishing to the topic `hello-world`.

1. Create an IoT Thing and allow AWS to generate certificates for it. Download the certificates and place them in this project's `/certs` directory.

1. Create a `config.json` in this project's root by copying `config.json.example` and update it to reference your IoT Thing certificate and key. Also update your device endpoint- this can be found on the IoT console under 'Settings'.
    ```
    cp ./config.json.example ./config.json
    ```

1. Install repository dependencies with `npm i`
1. Run the example with `npm start`
1. In the IoT Console, go to the MQTT Test Client and subscribe to the topic `hello-world`. You should see messages start to appear.