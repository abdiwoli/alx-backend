const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);

client.on('error', function (error) {
  console.error('Redis client not connected to the server:', error);
  client.quit();
});

client.on('connect', function () {
  console.log('Redis client connected to the server');
});

async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    if (value) {
      console.log(`${schoolName}: ${value}`);
    } else {
      console.log(`No value found for school '${schoolName}'.`);
    }
  } catch (error) {
    console.error(`Error getting ${schoolName}:`, error);
  }
}

// Example usage
displaySchoolValue('Holberton');
