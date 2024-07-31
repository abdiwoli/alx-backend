import redis from 'redis';
import kue from 'kue';
import express from 'express';
import createJobs from './create_job.js';
const queue = kue.createQueue();
import util from 'util'

const client = redis.createClient();
client.connect().catch(error => {
    console.error('Redis connection error:', error);
});

const seats = 50;
let reservationEnabled = true;

const reserveSeat = async (number) => {
    try {
        await client.set('available_seats', number);
    } catch (error) {
        console.error('Error reserving seat:', error);
    }
};


const getCurrentAvailableSeats = async () => {
    try {
        const reserved = await client.get('available_seats');
        return parseInt(reserved, 10) || 0;
    } catch (error) {
        console.error('Error getting current available seats:', error);
        return 0;
    }
};

queue.process('reservation', async (job, done) => {
    try {
        const seatsToDeduct = job.data.seats;
        const availableSeats = await getCurrentAvailableSeats();
        const numberOfSeats = availableSeats - seatsToDeduct;

        if (numberOfSeats < 0) {
            throw new Error('Not enough seats available');
        }

        await reserveSeat(numberOfSeats);

        if (numberOfSeats === 0) {
            reservationEnabled = false;
        }
        done();
    } catch (error) {
        done(error);
    }
});



const app = express();
app.use(express.json());
app.listen(1245, () => {
    console.log('Server is running on port 1245');
});


app.get('/available_seats', async (req, res) => {
    try {
        const availableSeats = await getCurrentAvailableSeats();
        res.status(200).json({ numberOfAvailableSeats: availableSeats });
    } catch (error) {
        res.status(500).json({ status: 'Error retrieving available seats' });
    }
});


app.get('/reserve_seat', async (req, res) => {
    if (reservationEnabled) {
        createJobs('reservation', 1);
        res.status(200).json({ status: 'Reservation in process' });
    } else {
        res.status(404).json({ status: 'Reservations are blocked' });
    }
});


app.get('/process', async (req, res) => {
    res.status(200).json({ status: 'Queue processing' });
});
