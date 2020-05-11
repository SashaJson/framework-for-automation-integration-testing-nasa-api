"use strict";

const fetch = require('node-fetch');
const moment = require("moment");
const util = require("util");
const defaults = require("../../config/defaults");
const utils = require("../../Libs/utils");
const validate = require("../../Libs/ajvValidator");
const checkStatusCode = require("../../Libs/checkStatusCode")

const dateFormat = "YYYY-MM-DD";
let todaysDate = moment().format(dateFormat);
const currentlyDate = utils.getCurrentlyDate();

let responseJson;

jest.setTimeout(defaults.jestTimeout); // it is necessary to increase timeout, because default timeout in Jest 5000ms

describe("Integration REST-API Testing APOD", () => {

    it("0. Make GET request with default query parameter to endpoint apod and received correct date", async () => {

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status200(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "copyright",
                        "date",
                        "explanation",
                        "hdurl",
                        "media_type",
                        "service_version",
                        "title",
                        "url"
                    ]
                }
            ]
        });

        expect(responseJson.date).toBe(todaysDate);
        expect(responseJson.media_type).toBe("image")
    });

    it("1. Make GET request with query parameter 'date=1919-03-06' to endpoint apod and expect 'Error'", async () => {

        const date = "1919-03-06";

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&date=${date}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status400(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "code",
                        "msg",
                        "service_version"
                    ]
                }
            ]
        });

        expect(responseJson.msg).toBe(`Date must be between Jun 16, 1995 and ${currentlyDate.month} ${currentlyDate.day}, ${currentlyDate.years}.`)
    });

    it("2. Make GET request with query parameter minimal 'date=1995-06-16' to endpoint apod", async () => {

        const date = "1995-06-16";

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&date=${date}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status200(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "copyright",
                        "date",
                        "explanation",
                        "hdurl",
                        "media_type",
                        "service_version",
                        "title",
                        "url"
                    ]
                }
            ]
        });

        expect(responseJson.date).toBe(date);
        expect(responseJson.media_type).toBe("image")

    });

    it("3. Make GET request with query parameter min date - 1 'date=1995-06-15' to endpoint apod", async () => {

        const minDateMinus1 = "1995-06-15";

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&date=${minDateMinus1}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status400(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "code",
                        "msg",
                        "service_version"
                    ]
                }
            ]
        });

        expect(responseJson.msg).toBe(`Date must be between Jun 16, 1995 and ${currentlyDate.month} ${currentlyDate.day}, ${currentlyDate.years}.`)
    });

    it("4. Make GET request with query parameter max 'date=currently date' to endpoint apod", async () => {

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&date=${todaysDate}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status200(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "copyright",
                        "date",
                        "explanation",
                        "hdurl",
                        "media_type",
                        "service_version",
                        "title",
                        "url"
                    ]
                }
            ]
        });

        expect(responseJson.date).toBe(todaysDate);
        expect(responseJson.media_type).toBe("image")
    });

    it("5. Make GET request with query parameter max date + 1 'date=2020-05-11' to endpoint apod", async () => {

        const maxDatePlus1 = moment().add(1, "days").format(dateFormat);

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&date=${maxDatePlus1}`);
        utils.checkAllResponse(response);
        checkStatusCode.Status400(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "code",
                        "msg",
                        "service_version"
                    ]
                }
            ]
        });

        expect(responseJson.msg).toBe(`Date must be between Jun 16, 1995 and ${currentlyDate.month} ${currentlyDate.day}, ${currentlyDate.years}.`)

    });

    it("6. Make GET request with query parameter 'hd = true' to endpoint apod", async () => {

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&hd=true`);
        utils.checkAllResponse(response);
        checkStatusCode.Status200(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "copyright",
                        "date",
                        "explanation",
                        "hdurl",
                        "media_type",
                        "service_version",
                        "title",
                        "url"
                    ]
                }
            ]
        });

        expect(responseJson.date).toBe(todaysDate);
        expect(responseJson.media_type).toBe("image")
    });

    it("7. Make GET request with query parameter 'hd = false' to endpoint apod", async () => {

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${defaults.apiKey}&hd=false`);
        utils.checkAllResponse(response);
        checkStatusCode.Status200(response.status);
        responseJson = await utils.transformResponseToJson(response);
        validate.validationCheckJsonSchema(responseJson, {
            "type": "object",
            "allOf": [
                {
                    "$ref": "apod.json#"
                },
                {
                    "required": [
                        "copyright",
                        "date",
                        "explanation",
                        "media_type",
                        "service_version",
                        "title",
                        "url"
                    ],
                    "not": {"required": ["hdurl"]}
                }
            ]
        });

        expect(responseJson.date).toBe(todaysDate);
        expect(responseJson.media_type).toBe("image")
    });

})