"use strict";

const fetch = require('node-fetch')
const d = require("../../defaults");
const u = require("../../utils");

let responseJson;

jest.setTimeout(d.jestTimeout); // it is necessary to increase timeout, because default timeout in Jest 5000ms

describe("Integration REST-API Testing APOD", () => {

    it("0. Make GET request with default query parameter to endpoint APOD", async () => {

        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=vidkL09R9ihkBAcesBGRgQtwiJkSfXQcToZi1aov");

        u.checkStatusCode200(response.status);
        responseJson = await u.transformResponseToJson(response);


        console.log(responseJson)
        expect(responseJson.media_type).toBe("image")
    });

})