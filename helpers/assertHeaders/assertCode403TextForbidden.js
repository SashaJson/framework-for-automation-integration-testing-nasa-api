'use strict';

const {status403} = require('./checkStatusCode');
const {statusTextForbidden} = require('./checkStatusText');

module.exports = (statusCode, statusText) => {

    status403(statusCode);
    statusTextForbidden(statusText);

}