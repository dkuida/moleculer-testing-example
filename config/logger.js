const dotenv = require('dotenv');
dotenv.config();
const {LOG_CONSOLE_LEVEL, LOG_LOCAL} = process.env;
const glob = require('./globs');
module.exports = {
	local: LOG_LOCAL,
	service: glob.moleculer.namespace,
	console: {
		level: LOG_CONSOLE_LEVEL
	},
	labelExtractors: ['moleculer']
};
