import amqp from 'amqplib';

export type ConsumeMessage = (msg: amqp.ConsumeMessage) => any;

let rabbitMQ: RabbitMQ;

export class RabbitMQ {

    channel: amqp.Channel;

    async connect() {
        await amqp.connect('amqp://localhost').then(async conn => {
            this.channel = await conn.createChannel();
            console.log(`Connected server`);
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

rabbitMQ = new RabbitMQ();

export { rabbitMQ };