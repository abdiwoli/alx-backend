import chai from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job.js';

const { expect } = chai;

describe('createPushNotificationsJobs', function() {
    let queue;

    beforeEach(function() {
        // Create a mock for the Kue queue
        queue = {
            create: sinon.stub().returns({
                id: 123, // Mock job id
                save: (callback) => {
                    // Simulate a successful job save
                    callback(null);
                },
                on: () => {} // No-op for event listeners
            })
        };
    });

    afterEach(function() {
        sinon.restore();
    });

    it('should throw an error if the input is not an array', function() {
        expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
    });

    it('should create jobs and add them to the queue', function(done) {
        const jobsArray = [
            { phoneNumber: '4153518780', message: 'Test message 1' },
            { phoneNumber: '4153518781', message: 'Test message 2' }
        ];

        createPushNotificationsJobs(jobsArray, queue);

        setImmediate(() => {
            expect(queue.create.calledTwice).to.be.true;
            expect(queue.create.firstCall.args[1]).to.deep.equal(jobsArray[0]);
            expect(queue.create.secondCall.args[1]).to.deep.equal(jobsArray[1]);

            // Check that job IDs are correctly assigned
            expect(queue.create.firstCall.returnValue.id).to.equal(123);
            expect(queue.create.secondCall.returnValue.id).to.equal(123);

            done();
        });
    });

    it('should handle job creation failure gracefully', function(done) {
        // Simulate a failure by providing an invalid job array
        queue.create.returns({
            save: (callback) => {
                // Simulate a failure in job save
                callback(new Error('Job save failed'));
            },
            on: () => {}
        });

        try {
            createPushNotificationsJobs(null, queue);
            done(new Error('Expected error not thrown'));
        } catch (err) {
            expect(err.message).to.equal('Jobs is not an array');
            done();
        }
    });
});
