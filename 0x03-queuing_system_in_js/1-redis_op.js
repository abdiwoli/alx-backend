import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error(`Redis client error: ${err.message}`);
  client.quit();
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

(async () => {
    try {
    await client.connect();
    const setNewSchool = async (schoolName, value) => {
      await client.set(schoolName, value, print);
    };

    const displaySchoolValue = async (schoolName) => {
      const value = await client.get(schoolName);
      if (value) {
        console.log(value);
      } else {
        console.log(`No value found for school '${schoolName}'.`);
      }
    };

    // Function calls
    await displaySchoolValue('Holberton');
    setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
  } catch (error) {
    console.error('Error during Redis operations:', error);
  } finally {
    await client.quit();
  }
})();
