import amqp from 'amqplib';

export type ConsumeMessage = (msg: amqp.ConsumeMessage) => any;

let messenger : Messenger;

export class Messenger {

    channel: amqp.Channel;

    async connect() {
        await amqp.connect('amqp://localhost').then(async conn => {
            this.channel = await conn.createChannel();
            console.log(`Server amqp is up`);
        });
    }

    async sendMessage(queue: string, data: any) {
        this.channel.assertQueue(queue, { durable: true }).then(_ => {
            this.channel.sendToQueue(queue, Buffer.from(data));
        })
    }

    async consumeQueue(queue: string, msg: ConsumeMessage) {
        this.channel.assertQueue(queue, { durable: true }).then(() => {
            this.channel.consume(queue, msg, { noAck: true });
            console.log('Created consume message: ' + queue);
        });
    }
}

messenger = new Messenger();

export { messenger };
