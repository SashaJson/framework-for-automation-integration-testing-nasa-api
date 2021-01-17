'use strict';

const fetch = require('node-fetch');
const {getCurlRequest} = require('./utils');

module.exports = async (url, method = 'GET', data = null) => {

    getCurlRequest(url, method, data);

    try {

        let body;
        const headers = {};

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return await response;

    } catch (error) {
        console.error('Error when make request', error.message);
    }

}