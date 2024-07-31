import { createClient } from 'redis';

const client = createClient();

await client.connect()
    .then(() => {
        console.log('Redis client connected to the server');
    })
    .catch(err => {
        console.log(`Redis client not connected to the server: ${err}`);
    });

const setNewSchool = (schoolName, value) => {
    client.set(schoolName, value)
        .then(data => {
            console.log(`Reply: ${data}`);
        })
        .catch(err => {
            console.error(err);
        });
}

const displaySchoolValue = async (schoolName) => {
    try {
        const data = await client.get(schoolName);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
