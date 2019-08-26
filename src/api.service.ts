import * as moleculer from 'moleculer';
import { Service } from 'moleculer-decorators';
import * as ApiGateway from 'moleculer-web';

@Service({
    mixins: [ApiGateway],
    settings: {
        port: process.env.PORT || 9000,
        routes: [
            {
                aliases: {
                    'GET quote': 'QuoteWorkflowManager.baseQuote'
                },
                bodyParsers: {
                    json: true
                },
                mappingPolicy: 'restrict',
                path: '/',
                whitelist: ['QuoteWorkflowManager.baseQuote']
            }
        ]
    }
})
class Api extends moleculer.Service {
}

module.exports = Api;
