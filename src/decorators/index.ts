import { messenger } from '../messengers'

const consumerMessage = function consumer(queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeQueue(queue, descriptor.value); }, 1000);
        return descriptor;
    }
}

const consumerMessageRPC = function consumerMessageRPC(queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeQueue(queue, descriptor.value); }, 1000);
        return descriptor;
    }
}

const consumerExchange = function consumerExchange(exchange, routeKey, queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeExchange(exchange, routeKey, queue, descriptor.value) }, 1000);
        return descriptor;
    }
}

const consumerFanout = function consumerFanout(exchange, queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeFanout(exchange, queue, descriptor.value) }, 1000);
        return descriptor;
    }
}

const consumerTopic = function consumerTopic(exchange, pattern, queue) {
    return function decorator(t, n, descriptor) {
        setTimeout(() => { messenger.consumeTopic(exchange, pattern, queue, descriptor.value) }, 1000);
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
                return result;
            } catch (e) {
                throw e;
            }
        }
    }
    return descriptor;
}

export { consumerMessage, consumerExchange, consumerFanout, consumerTopic, consumerMessageRPC, logger };
