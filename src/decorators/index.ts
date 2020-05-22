import { messenger } from '../messengers'

const consumerMessage = function consumer(queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeQueue(queue, descriptor.value); }, 1000);
        return descriptor;
    }
}

const logger = function logger(target, name, descriptor) {
    const original = descriptor.value;

    if (typeof original === 'function') {
        descriptor.value = function (...args) {
            console.log(`Logger --> Arguments: ${args} - ${new Date()}`);
            try {
                const result = original.apply(this, args);
                console.log(`Logger --> Result: ${result} - ${new Date()}`);
                return result;
            } catch (e) {
                console.log(`Logger --> Error: ${e} - ${new Date()}`);
                throw e;
            }
        }
    }
    return descriptor;
}

export { consumerMessage, logger };
