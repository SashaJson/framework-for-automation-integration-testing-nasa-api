"use strict";

const fetch = require('node-fetch');
const util = require("util");

module.exports = async (url, method = "GET", data = null) => {

    switch (method) {

        case "GET":
            console.log(util.inspect(`curl --request ${method} '${url}'`, {
                showHidden: false,
                depth: null
            }));
            break;

        case 'POST':
            console.log(util.inspect(`curl --request ${method} '${url}' --header 'Content-Type: application/json' --data-raw '${JSON.stringify(data)}'`, {
                showHidden: false,
                depth: null
            }));
            break;

        case 'PUT':
            console.log(util.inspect(`curl --request ${method} '${url}' --header 'Content-Type: application/json' --data-raw '${JSON.stringify(data)}'`, {
                showHidden: false,
                depth: null
            }));
            break;

        case 'DELETE':
            console.log(util.inspect(`curl --request ${method} '${url}' --data-raw ''`, {
                showHidden: false,
                depth: null
            }));
            break;

        default:
            throw new Error('Method undefine')
    }

    try {

        let body;
        const headers = {};

        if (data) {
            headers['Content-Type'] = "application/json";
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return await response

    } catch (err) {
        console.error("Error", err.message)
    }

}