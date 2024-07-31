import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';
import kue from 'kue';
import { expect } from 'chai';

const queue = kue.createQueue();

describe('createPushNotificationsJobs', function() {

    it('should create jobs and add them to the queue', function(done) {
        const jobsArray = [
            { phoneNumber: '4153518780', message: 'Test message 1' },
            { phoneNumber: '4153518781', message: 'Test message 2' }
        ];

        createPushNotificationsJobs(jobsArray, queue);

        setImmediate(() => {
            done();
        });
    });

    it('should handle job progress updates', function(done) {
        const jobsArray = [
            { phoneNumber: '4153518780', message: 'Test message 1' }
        ];
        const job = queue.create('push_notification_code_3', jobsArray[0]);
        const progressSpy = sinon.spy();

        job.on('progress', progressSpy);

        createPushNotificationsJobs(jobsArray, queue);

        setImmediate(() => {
            job.emit('progress', 50);
            expect(progressSpy.calledOnce).to.be.true;
            expect(progressSpy.calledWith(50)).to.be.true;

            done();
        });
    });
    
});
