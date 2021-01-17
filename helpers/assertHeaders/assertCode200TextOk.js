'use strict';

const {status200} = require('./checkStatusCode');
const {statusTextOk} = require('./checkStatusText');

module.exports = (statusCode, statusText) => {

    status200(statusCode);
    statusTextOk(statusText);

}