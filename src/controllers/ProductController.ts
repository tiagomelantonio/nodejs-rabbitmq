import { messenger } from '../messengers/index';
import { ConsumeMessage } from 'amqplib';
import { consumerMessage, consumerFanout, consumerExchange, consumerTopic, consumerMessageRPC } from '../decorators';

export class ProductController {

    @consumerMessage("test_simple_queue_q")
    async consumeSimpleQueue(msg: ConsumeMessage) {
        console.log('Simple Queue ==> ' + msg.content.toString());
    }

    @consumerMessageRPC("test_queue_rpc_q")
    async consumerMessageRPC(msg: ConsumeMessage) {
        console.log('Queue RPC ==> ' + msg.content.toString());

        messenger.sendMessage(msg.properties.replyTo, msg.content.toString());
    }

    @consumerMessage("test_queue_rpc_return_q")
    async consumerMessageRPCReturn(msg: ConsumeMessage) {
        console.log('Queue RPC Return ==> ' + msg.content.toString());
    }

    @consumerExchange('tida', 'exchangeDirect', 'test_exchange_direct_q')
    async consumeExchangeDirect(msg: ConsumeMessage) {
        console.log('Exchange Direct ==> ' + msg.content.toString());
    }

    @consumerFanout('fanout', 'test_exchange_fanout_q')
    async consumeExchangeFanout(msg: ConsumeMessage) {
        console.log('Exchange Fanout ==> ' + msg.content.toString());
    }

    @consumerTopic('topic', '*.error.*', 'test_topic_error_q')
    async consumeTopic(msg: ConsumeMessage) {
        console.log('Topic error ==> ' + msg.content.toString());
    }

    @consumerTopic('topic', '*.info.*', 'test_topic_info_q')
    async consumeTopic1(msg: ConsumeMessage) {
        console.log('Topic info ==> ' + msg.content.toString());
    }

    @consumerTopic('topic', '#', 'test_topic_all_q')
    async consumeTopic3(msg: ConsumeMessage) {
        console.log('Topic all ==> ' + msg.content.toString());
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

    async sendMessageTopic(message: any) {
        messenger.sendMessageTopic('topic', 'updated.info.product', JSON.stringify(message));
    }

    async sendMessageRPC(message: any) {
        messenger.sendMessageRPC('test_queue_rpc_q', 'test_queue_rpc_return_q', JSON.stringify(message));
    }
}
