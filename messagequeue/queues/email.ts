import { Worker } from 'bullmq';
import { REDIS_CLIENT } from './secrets';

interface EmailPayload {
    from: string;
    to: string;
    subject: string;
    body: string;
}

async function sendEmail(payload: EmailPayload) {

    const { from, to, subject, body } = payload;

    return new Promise((resolve, reject) => {
        console.log(`Sending Email to ${to}....`);
        setTimeout(() => {
            console.log(`Email sent to ${to}`);
            resolve(1)
        }, 1 * 1000);
    });
}


const worker = new Worker('email-queue', async job => {
    console.log('Job data', job.data);

    const { from, to, subject, body } = job.data;
    await sendEmail({ from, to, subject, body });

}, {
    connection: REDIS_CLIENT,
});

export default worker;
