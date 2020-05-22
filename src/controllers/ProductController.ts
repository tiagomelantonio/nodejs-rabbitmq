import { messenger } from '../messengers/index';
import { ConsumeMessage } from 'amqplib';
import { consumerMessage, logger } from '../decorators'

export class ProductController {

    @consumerMessage("test_product_send_erp_q")
    async sendProductErp(msg: ConsumeMessage) {
        console.log('test_product_send_erp_q:: ' + msg.content.toString());
    }

    @consumerMessage("test_product_update_q")
    async updateProduct(msg: ConsumeMessage) {
        console.log('test_product_update_q:: ' + msg.content.toString());
    }

    @logger
    async sendMessage(message: string) {
        messenger.sendMessage('test_product_update_q', message);
        messenger.sendMessage('test_product_send_erp_q', message);
        return {
            name: "teste"
        };
    }
}
