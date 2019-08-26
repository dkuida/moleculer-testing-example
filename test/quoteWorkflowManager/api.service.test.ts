import { ServiceBroker } from 'moleculer';
import * as request from 'supertest';

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
    beforeEach(async () => {

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
        await  getQuote()
                .send(VALID_DATA)
                .expect(200);
    });
    test('age is required', async () => {
        await getQuote()
                .send({...VALID_DATA, age: undefined})
                .expect(422);
    });
});
