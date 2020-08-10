const env = process.env.NODE_ENV;

let config = null;
try {
    config = require(`./env/${env}`)
} catch (ex) {
    console.log('Configuration failed to load', ex);
}

module.exports = Object.assign(
    {},
    {
        API_URL: process.env.REACT_APP_API_URL,
        TABLE_TIMEZONES_MAX_ROWS: process.env.REACT_APP_TABLE_TIMEZONES_MAX_ROWS
    },
    config || {}
);