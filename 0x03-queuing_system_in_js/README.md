Project Setup and Task Documentation
Introduction
This README provides instructions for setting up the project and executing various tasks. Follow the sections below for detailed instructions on each task.
Cloning the GitHub Repository
To get started, clone the GitHub repository:
git clone https://github.com/abdiwoli/alx-backend.git
Navigating to the Project Directory
Navigate to the relevant project directory:
cd alx-backend/0x03-queuing_system_in_js

Task 0: Running Redis Server
You will the Find the In the project root dump.rdb

Task 1: Running Redis Server
Instructions
The Redis server executable should be available in your system’s PATH. Start the Redis server using the following command:
redis-server > /dev/null 2>&1 &
npm run dev 0-redis_client.js
•	It should log to the console the message Redis client connected to the server when the connection to Redis works correctly
•	It should log to the console the message Redis client not connected to the server: ERROR_MESSAGE when the connection to Redis does not work


Task 2: Node Redis client and basic operations

npm run dev 2-redis_op_async.js

> queuing_system_in_js@1.0.0 dev /root
> nodemon --exec babel-node --presets @babel/preset-env "2-redis_op_async.js"

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 2-redis_op_async.js`
Redis client connected to the server
School
Reply: OK
100
Task 2:  Node Redis client and async operations

abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 1-redis_op.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 1-redis_op.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 1-redis_op.js`
Redis client connected to the server
School
Reply: OK
100
Task 3:  Node Redis client and async operations
abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 2-redis_op_async.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 2-redis_op_async.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 2-redis_op_async.js`
Redis client connected to the server
School
Reply: OK
100


Task 4:  Node Redis client and advanced operations

abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 4-redis_advanced_op.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 4-redis_advanced_op.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 4-redis_advanced_op.js`
Redis client connected to the server
Reply: 0
Reply: 0
Reply: 0
Reply: 0
Reply: 0
Reply: 0
[Object: null prototype] {
  Portland: '50',
  Seattle: '80',
  'New York': '20',
  Bogota: '20',
  Cali: '40',
  Paris: '2'
}

Task 5:  Node Redis client publisher and subscriber

Terminal1:
abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 5-subscriber.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 5-subscriber.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-subscriber.js`
Redis client connected to the server

 
Terminal2:
abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 5-publisher.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 5-publisher.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-publisher.js`
Redis client connected to the server
About to send Holberton Student #1 starts course
About to send Holberton Student #2 starts course
About to send KILL_SERVER
About to send Holberton Student #3 starts course

AGAIN TERMINAL1:
abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 5-subscriber.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 5-subscriber.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 5-subscriber.js`
Redis client connected to the server
Holberton Student #1 starts course
Holberton Student #2 starts course
KILL_SERVER

6. Create the Job creator

abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ emacs 6-job_creator.js
abdiwoli@abdiwoliPC:~/alx-backend/0x03-queuing_system_in_js$ npm run dev 6-job_creator.js

> queuing_system_in_js@1.0.0 dev
> nodemon --exec babel-node --presets @babel/preset-env 6-job_creator.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node --presets @babel/preset-env 6-job_creator.js`
Notification job created: 1
