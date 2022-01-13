const iotsdk = require('aws-iot-device-sdk-v2');
const mqtt = iotsdk.mqtt;
const iot = iotsdk.iot;

const config = require('./config');

// The topic to publish messages to
const topic = 'hello-world';
const clientId = 'js-sdk-example';

// How often to publish data
const interval = 2000;

async function execute_session(connection, argv) {
    return new Promise(async (resolve, reject) => {
        try {
            let i = 0;

            let sampleInterval = setInterval(() => {

                let message = `hello world ${i}`;

                console.log(`Publishing "${message}" to topic "${topic}"`);
  
                let payload = {
                    message
                };

                connection.publish(topic,
                    payload,
                    mqtt.QoS.AtLeastOnce);

                i++;
              }, interval)
        }
        catch (error) {
            reject(error);
        }
    });
}

async function main() {
    let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(config.certPath, config.keyPath)
        .with_certificate_authority_from_path(config.caPath)
        .with_clean_session(false)
        .with_client_id(clientId)
        .with_endpoint(config.endpoint);

    let connectionConfig = config_builder.build();
    const client = new mqtt.MqttClient();
    let connection = client.new_connection(connectionConfig);

    // force node to wait 60 seconds before killing itself, promises do not keep node alive
    // ToDo: we can get rid of this but it requires a refactor of the native connection binding that includes
    //    pinning the libuv event loop while the connection is active or potentially active.
    const timer = setInterval(() => {}, 60 * 1000);

    await connection.connect();
    await execute_session(connection);
    await connection.disconnect();

    // Allow node to die if the promise above resolved
    clearTimeout(timer);
}

main();