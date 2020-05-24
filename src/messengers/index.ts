import amqp from 'amqplib';

export type ConsumeMessage = (msg: amqp.ConsumeMessage) => any;

let messenger : Messenger;

export class Messenger {

    channel: amqp.Channel;
    conn: amqp.Connection;

    async connect() {
        amqp.connect('amqp://localhost').then(async conn => {
            console.log(`Server amqp is up`);
            this.conn = conn;
        });
    }

    async sendMessage(queue: string, data: any) {
        const ch = await this.conn.createChannel();
        ch.assertQueue(queue, { durable: true });
        ch.sendToQueue(queue, Buffer.from(data));
    }

    async sendExchange(exchange: string, routeKey: string, data: any) {
        const ch = await this.conn.createChannel();
        ch.assertExchange(exchange, 'direct', { durable: true });
        ch.publish(exchange, routeKey, Buffer.from(data));
    }

    async sendFanout(exchange: string, data: any) {
        const ch = await this.conn.createChannel();
        ch.assertExchange(exchange, 'fanout', { durable: true });
        ch.publish(exchange, '', Buffer.from(data));
    }

    async sendMessageTopic(exchange: string, pattern: string, data: any) {
        const ch = await this.conn.createChannel();
        ch.assertExchange(exchange, 'topic', { durable: true });
        ch.publish(exchange, pattern, Buffer.from(data));
    }

    async sendMessageRPC(queue: string, replyTo: string, data: any) {
        const ch = await this.conn.createChannel();
        ch.assertQueue(queue, { durable: true });
        ch.sendToQueue(queue, Buffer.from(data), {
            replyTo: replyTo
        });
    }

    async consumeQueue(queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        await ch.assertQueue(queue, { durable: true });
        await ch.consume(queue, msg, { noAck: true });
        console.log('Created consume simples queue: ', queue);
    }

    async consumeExchange(exchange: string, routeKey: string, queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        await ch.assertExchange(exchange, 'direct', { durable: true });
        await ch.assertQueue(queue);
        await ch.bindQueue(queue, exchange, routeKey);
        await ch.consume(queue, msg, { noAck: true });
        console.log('Created consume exchange direct: ', exchange, routeKey, queue);
    }

    async consumeFanout(exchange: string, queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        await ch.assertExchange(exchange, 'fanout', { durable: true });
        await ch.assertQueue(queue, { durable: true });
        await ch.bindQueue(queue, exchange, '');
        await ch.consume(queue, msg, { noAck: true });
        console.log('Created consume exchange fanout: ', exchange, queue);
    }

    async consumeTopic(exchange: string, pattern: string, queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        await ch.assertExchange(exchange, 'topic', { durable: true });
        await ch.assertQueue(queue);
        await ch.bindQueue(queue, exchange, pattern);
        await ch.consume(queue, msg, { noAck: true });
        console.log('Created consume topic: ', exchange, pattern, queue);
    }
}

messenger = new Messenger();

export { messenger };
