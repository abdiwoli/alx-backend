import kue from 'kue';

const queue = kue.createQueue();

const  createPushNotificationsJobs = (arrayOb, queue) => {
    if (!Array.isArray(arrayOb)){
        throw new Error('Jobs is not an array');
    }

    arrayOb.forEach(data => {
        const job = queue.create('push_notification_code_3', data)
              .save(err=>{
                  if (!err) {
                      if (job.id){
                          console.log(`Notification job created: ${job.id}`);
                      }
                  }
                  else {console.log(`Notification job failed: ${err}`);}
              });
        
        job.on('complete', () => {
            console.log(`Notification job ${job.id} completed`);
        });

        job.on('failed', err => {
            console.log(`Notification job ${job.id} failed: ${err}`);
        });

        job.on('progress', (progress, data) => {
            console.log(`Notification job ${job.id} ${progress}% complete`);
        });

    });
    
}


export default createPushNotificationsJobs;
