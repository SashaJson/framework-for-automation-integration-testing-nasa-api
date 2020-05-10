"use strict";

const fetch = require('node-fetch')
const defaults = require("../../config/defaults");
const utils = require("../../libForTesting/utils");
const validate = require("../../libForTesting/ajvValidator");

let responseJson;

jest.setTimeout(defaults.jestTimeout); // it is necessary to increase timeout, because default timeout in Jest 5000ms

describe("Integration REST-API Testing APOD", () => {

    it("0. Make GET request with default query parameter to endpoint APOD", async () => {

        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=vidkL09R9ihkBAcesBGRgQtwiJkSfXQcToZi1aov");

        utils.checkStatusCode200(response.status);
        responseJson = await utils.transformResponseToJson(response);


        console.log(responseJson)
        expect(responseJson.media_type).toBe("image")
    });

})