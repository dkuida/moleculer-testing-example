import { ServiceBroker } from 'moleculer';
import * as moleculerConfig from '../../moleculer.config';
const broker = new ServiceBroker(moleculerConfig);
broker.loadServices('./dist', '**/*.service.js');
broker.start();
