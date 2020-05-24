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
    }, 300000);

    setInterval(() => {
        new ProductController().sendExchange(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 }),
                phone: faker.phone.phoneNumberFormat()
            }
        );
    }, 400000);


    setInterval(() => {
        new ProductController().sendFanout(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 }),
                company: faker.company.catchPhraseDescriptor()
            }
        );
    }, 100000);

    setInterval(() => {
        new ProductController().sendMessageTopic(
            {
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 }),
                city: faker.address.city()
            }
        );
    }, 500000);

    setInterval(() => {
        new ProductController().sendMessageRPC(
            {
                id: '123456',
                name: `${faker.name.findName()} ${faker.name.lastName()}`,
                age: faker.random.number({ min: 1, max: 100 })
            }
        );
    }, 2000);
})();
