import { messenger } from './messengers';
import { ProductController } from './controllers/ProductController';
import faker from 'faker';

(async() => {
    await messenger.connect();

    faker.locale = 'pt_BR';

    setInterval(() => {
        new ProductController().sendMessage(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 })
            }
        );
    }, 3000);

    setInterval(() => {
        new ProductController().sendExchange(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 }),
                phone: faker.phone.phoneNumberFormat()
            }
        );
    }, 4000);


    setInterval(() => {
        new ProductController().sendFanout(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 }),
                company: faker.company.catchPhraseDescriptor()
            }
        );
    }, 10000);

})();
