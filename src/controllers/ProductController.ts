import { messenger } from '../messengers/index';
import { ConsumeMessage } from 'amqplib';
import { consumerMessage, logger, consumeFanout, consumeExchange } from '../decorators'

export class ProductController {

    @consumerMessage("test_simple_queue_q")
    async consumeSimpleQueue(msg: ConsumeMessage) {
        console.log('Simple Queue ==> ' + msg.content.toString());
    }

    @consumeExchange('tida', 'exchangeDirect', 'test_exchange_direct_q')
    async consumeExchangeDirect(msg: ConsumeMessage) {
        console.log('Exchange Direct ==> ' + msg.content.toString());
    }

    @consumeFanout('fanout', 'test_exchange_fanout_q')
    async consumeExchangeFanout(msg: ConsumeMessage) {
        console.log('Exchange Fanout ==> ' + msg.content.toString());
    }

    async sendMessage(message: any) {
        messenger.sendMessage('test_simple_queue_q', JSON.stringify(message));
    }

    async sendExchange(message: any) {
        messenger.sendExchange('tida', 'exchangeDirect', JSON.stringify(message));
    }

    async sendFanout(message: any) {
        messenger.sendFanout('fanout', JSON.stringify(message));
    }
}
