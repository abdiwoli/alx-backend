import { createClient } from 'redis';

(async () => {
  const client = createClient();

  client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
  });

  try {
    await client.connect();
    console.log('Redis client connected to the server');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  } finally {
    await client.disconnect();
  }
})();
