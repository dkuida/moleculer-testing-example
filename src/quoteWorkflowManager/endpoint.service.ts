import * as moleculer from 'moleculer';
import { Service, Action } from 'moleculer-decorators';

@Service({
})
class QuoteWorkflowManager extends moleculer.Service {
    @Action({
        params: {
            age: {type: 'number'}
        }
    })
    public async baseQuote(_ctx: moleculer.Context) {
        const quote = await this.broker.call('QuoteData.find');
        return quote[0];
    }
}

module.exports = QuoteWorkflowManager;
