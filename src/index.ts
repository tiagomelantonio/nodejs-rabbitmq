import express from 'express';
import { rabbitMQ } from './rabbitmq';
import { ProductController } from './controllers/ProductController';

const app = express();
app.listen(3000);

(async() => {
    await rabbitMQ.connect();

    setTimeout(() => {
        new ProductController().sendMessage(`Tiago Melantonio`);
    }, 5000);

})();
