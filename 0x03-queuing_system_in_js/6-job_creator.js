import kue from 'kue';

const queue = kue.createQueue();

const data = {
    phoneNumber: '9746688',
  message: 'This is the code to verify your account',
}

const job = queue.create('push_notification_code', data)
      .save( (err) => {
          if (!err) console.log(`Notification job created: ${job.id}`);
          else console.log('Notification job failed');
      })
