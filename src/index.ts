import { messenger } from './messengers';
import { ProductController } from './controllers/ProductController';

(async() => {
    await messenger.connect();

    setInterval(() => {
        new ProductController().sendMessage(`Tiago Melantonio`);
    }, 2000);

})();
