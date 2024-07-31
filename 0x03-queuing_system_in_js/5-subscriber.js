import { createClient } from 'redis';

const client = createClient();

await client.connect()
    .then(() => {
        console.log('Redis client connected to the server');
    })
    .catch(err => {
        console.log(`Redis client not connected to the server: ${err}`);
    });

const channel = 'holberton school channel';
let shouldExit = false;


client.subscribe(channel, (message) => {
    if (shouldExit) process.exit(0);;

    console.log(message);
    if (message === 'KILL_SERVER') {
        shouldExit = true;
        client.unsubscribe(channel, () => {
            process.exit(0);
        });
    }
});
