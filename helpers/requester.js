'use strict';

const inspect = require('util').inspect;
const fetch = require('node-fetch');

const { BASE_URL } = require('../static-data/defaults');

async function get(path) {

    const METHOD = 'GET';

    console.log(inspect(`curl --request ${ METHOD } '${ BASE_URL }${ path }'`, { showHidden: false, depth: null }));

    const requestOptions = { method: METHOD };

    const response = await fetch(BASE_URL + path, requestOptions);

    return handleResponse(response);

}


function handleResponse(response) {

    console.log('Date when make request: ' + Date());

    for (let [key, value] of response.headers) {
        console.log(`Headers: ${ key } = ${ value }`);
    }

    console.log(`HTTP-cod response: ${ response.status }`);

    if (!response.ok) {
        console.error(`Server return HTTP-cod: ${ response.status }`);
        return response.text();
    } else {
        return response.json();
    }

}

module.exports = { get }
