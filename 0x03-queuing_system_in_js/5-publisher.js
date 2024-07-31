import { createClient } from 'redis';

const client = createClient();

await client.connect()
    .then(() => {
        console.log('Redis client connected to the server');
    })
    .catch(err => {
        console.log(`Redis client not connected to the server: ${err}`);
    });

const publishMessage = async (message, time) => {
    setTimeout(() => {
        console.log(`About to send ${message}`);
    }, time);
    const channel = 'holberton school channel';
    await client.publish(channel, message);
}


publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
