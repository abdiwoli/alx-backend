import kue from 'kue';
const queue = kue.createQueue();

const createJobs = (jobName, seatsToDeduct) => {
    const job = queue.create(jobName, { seats: seatsToDeduct }).save();
    job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
    });
    job.on('failed', (errorMessage) => {
        console.error(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    });
};

export default createJobs;
