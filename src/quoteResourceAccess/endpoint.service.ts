import * as moleculer from 'moleculer';

// @ts-ignore
import * as DbAdaptor from 'moleculer-db';
import { TypeOrmDbAdapter } from 'moleculer-db-adapter-typeorm';
import { Service, Action } from 'moleculer-decorators';
import { Quote } from './model/Quote';

const typeOrmDbAdapter = new TypeOrmDbAdapter({} as any);

@Service({
    adapter: typeOrmDbAdapter,
    mixins: [DbAdaptor],
    model: Quote,
    settings: {
        idField: 'userId'

    }
})
class QuoteResourceAccess extends moleculer.Service {

    @Action({})
    public  first(_ctx: moleculer.Context) {
        return {};
    }
}

module.exports = QuoteResourceAccess;
