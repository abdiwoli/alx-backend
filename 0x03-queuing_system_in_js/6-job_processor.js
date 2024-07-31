import kue from 'kue';

const queue = kue.createQueue();

const sendNotification = (phoneNumber, message ) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`)
}

//Write the queue process that will listen to new jobs on push_notification_code

queue.process('push_notification_code', (job, done) => {
  // Extract job data
  const { phoneNumber, message } = job.data;
  
  // Call the function to send the notification
  sendNotification(phoneNumber, message);
  
  // Mark the job as complete
  done();
});
