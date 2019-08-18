const dotenv = require('dotenv');
dotenv.config();
const {MOLECULER_NAMESPACE} = process.env;
module.exports = {
    moleculer: {
        namespace: MOLECULER_NAMESPACE
    },

};
