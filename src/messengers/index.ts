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

    async consumeQueue(queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        ch.assertQueue(queue, { durable: true });
        ch.consume(queue, msg, { noAck: true });
        console.log('Created consume simples queue: ', queue);
    }

    async consumeExchange(exchange: string, routeKey: string, queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        ch.assertExchange(exchange, 'direct', { durable: true });
        ch.assertQueue(queue);
        ch.bindQueue(queue, exchange, routeKey);
        ch.consume(queue, msg, { noAck: true });
        console.log('Created consume exchange direct: ', exchange, routeKey, queue);
    }

    async consumeFanout(exchange: string, queue: string, msg: ConsumeMessage) {
        const ch = await this.conn.createChannel();
        ch.assertExchange(exchange, 'fanout', { durable: true });
        ch.assertQueue(queue, { durable: true });
        ch.bindQueue(queue, exchange, '');
        ch.consume(queue, msg, { noAck: true });
        console.log('Created consume exchange fanout: ', exchange, queue);
    }
}

messenger = new Messenger();

export { messenger };
