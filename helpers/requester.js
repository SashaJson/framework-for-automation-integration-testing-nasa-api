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

        console.log('Data when make request: ' + Date());

        for (let [key, value] of response.headers) {
            console.log(`Headers: ${key} = ${value}`);
        }

        console.log(`HTTP-cod response: ${response.status}`);

        return await response;

    } catch (error) {
        console.error('Error when make request', error.message);
    }

}