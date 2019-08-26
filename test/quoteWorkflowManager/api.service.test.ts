import { ServiceBroker } from 'moleculer';
import * as request from 'supertest';
import { Quote } from '../../src/quoteResourceAccess/model/Quote';

describe('quote API', () => {
    const TIMEOUT = 2000;
    jest.setTimeout(TIMEOUT);
    const broker = new ServiceBroker({logLevel: 'info', namespace: 'quote-api'});
    const apiSchema = require('../../src/api.service');
    const quoteWorkflowManager = require('../../src/quoteWorkflowManager/endpoint.service');
    broker.createService(quoteWorkflowManager);
    const apiService = broker.createService(apiSchema);
    const VALID_DATA = {age: 40, name: 'dan'};
    const serverRequest = request(apiService.server);
    const getQuote = () => serverRequest.get('/quote');
    const callReal = broker.call.bind(broker);
    beforeEach(async () => {

        broker.call = jest.fn().mockImplementation(async (actionName, params) => {
            if (actionName && typeof actionName === 'string') {
                return Promise.resolve([]);
            }
            return callReal(actionName, params);

        });

        await broker.start();

    });
    afterEach(async () => {
        await broker.stop();

    });
    test('path responds', async () => {
        await getQuote()
                .then((res) => {
                    expect(res.status).not.toEqual(404);
                });
    });
    test('passes with valid parameters', async () => {
        await getQuote()
                .send(VALID_DATA)
                .expect(200);
    });
    test('age is required', async () => {
        await getQuote()
                .send({...VALID_DATA, age: undefined})
                .expect(422);
    });
});

describe('quote business logic', () => {
    const TIMEOUT = 2000;
    jest.setTimeout(TIMEOUT);
    const broker = new ServiceBroker({logLevel: 'info', namespace: 'quote-service'});
    const quoteWorkflowManager = require('../../src/quoteWorkflowManager/endpoint.service');
    broker.createService(quoteWorkflowManager);
    const VALID_DATA = {age: 40, name: 'dan'};
    broker.createService({
        actions: {
            find() {
                const quote = new Quote();
                quote.code = 'code1';
                return Promise.resolve([quote]);
            }
        },
        name: 'QuoteData'
    });
    beforeEach(async () => {

        await broker.start();
    });
    afterEach(async () => {
        await broker.stop();

    });
    test('given 1 response return it', async () => {
        const quote = await broker.call('QuoteWorkflowManager.baseQuote', VALID_DATA);
        expect(quote).toEqual({code: 'code1'});
    });
});
