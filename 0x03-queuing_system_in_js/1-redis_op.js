import { createClient } from 'redis';
import redis from 'redis';

const client = await createClient();

await client.connect()
    .then(() => {
        console.log('Redis client connected to the server');
    })
    .catch(err => {
        console.log(`Redis client not connected to the server: ${err}`);
    });

const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value, redis.print)
        .then (data => {
            console.log(`Reply: ${data}`);
        })
        .catch(err => {console.log(err)});
}

const displaySchoolValue = (schoolName) => {
    client.get(schoolName)
        .then (data => {
            console.log(data);
        })
        .catch(err => {console.log(err)});
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
