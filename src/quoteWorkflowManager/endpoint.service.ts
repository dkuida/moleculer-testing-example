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
    public baseQuote(_ctx: moleculer.Context) {
        //
    }
}

module.exports = QuoteWorkflowManager;
