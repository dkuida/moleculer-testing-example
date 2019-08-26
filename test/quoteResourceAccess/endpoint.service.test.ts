jest.mock('moleculer-db');
jest.mock('moleculer-db-adapter-typeorm', () => {
    return {TypeOrmDbAdapter: jest.fn()};
});
import { ServiceBroker } from 'moleculer';

describe('quoteDataAccess', () => {
    const TIMEOUT = 2000;
    jest.setTimeout(TIMEOUT);
    const broker = new ServiceBroker({logLevel: 'info', namespace: 'quote-resource-access'});
    const quoteResourceAccess = require('../../src/quoteResourceAccess/endpoint.service');
    broker.createService(quoteResourceAccess);
    beforeEach(async () => {

        await broker.start();
    });
    afterEach(async () => {
        await broker.stop();

    });
    test.only('only first returned', async () => {
        const result = await broker.call('QuoteResourceAccess.first');
        expect(result).toEqual({});
    });
});
