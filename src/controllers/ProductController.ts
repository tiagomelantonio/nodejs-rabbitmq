import { ConsumeMessage } from "amqplib";
import { rabbitMQ } from '../rabbitmq/index';

function consumer(queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { rabbitMQ.consumeQueue(queue, descriptor.value); }, 1000);
        return descriptor;
    }
}

export class ProductController {

    @consumer("product_send_erp_q")
    async sendProductErp(msg: ConsumeMessage) {
        console.log(msg.content.toString());
    }

    @consumer("product_update_q")
    async updateProduct(msg: ConsumeMessage) {
        console.log(msg.content.toString());
    }

    async sendMessage(message: string) {
        rabbitMQ.sendMessage('new-message', message);
    }
}