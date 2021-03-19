'use strict';

const moment = require('moment');

const {
    API_KEY,
    URL_APOD,
    CONTENT_TYPE,
    DATE_FORMAT,
    JEST_TIMEOUT,
    RATE_LIMIT,
    TYPE_IMAGE,
    INVALID_DATE,
    MINIMAL_DATE,
    MIN_DATE_MINUS_1
} = require('../../config/defaults');

const {
    transformResponseToJson,
    getCurrentlyDate
} = require('../../helpers/utils');

const missApiKeyJsonModel = require('../../json-schemas/response-models/apiKeyMissing'),
    defaultResultJsonModel = require('../../json-schemas/response-models/defaultResult');

const randomValidDate = require('../../helpers/generation-random-data/getRandomDate');
const request = require('../../helpers/requester');
const validateJsonSchema = require('../../helpers/validation-json-schemas');

const TODAY_DATE = moment().format(DATE_FORMAT),
    RANDOM_DATE = randomValidDate(),
    MAX_DATE_PLUS_1 = moment().add(1, 'days').format(DATE_FORMAT);

let errMessInDate;

jest.setTimeout(JEST_TIMEOUT); // it is necessary to increase timeout, because default timeout in Jest 5000ms

describe('Integration REST-API Testing APOD', () => {

    describe("Testing query parameter 'date'", () => {

        it("0. Make GET request with default query parameter to endpoint APOD and received correct date", async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, defaultResultJsonModel());

            expect(responseJSON.date).toBe(TODAY_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

        it(`1. Make GET request with query parameter 'date=${INVALID_DATE}' to endpoint APOD and expect 'Error'`, async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${INVALID_DATE}`);

            expect(response.status).toBe(400);
            expect(response.statusText).toBe('BAD REQUEST');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
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

            expect(responseJSON.msg).toBe(`Date must be between Jun 16, 1995 and ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

        });

        it(`2. Make GET request with query parameter minimal 'date=${MINIMAL_DATE}' to endpoint APOD`, async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${MINIMAL_DATE}`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, defaultResultJsonModel());

            expect(responseJSON.date).toBe(MINIMAL_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

        it(`3. Make GET request with query parameter min date - 1 'date=${MIN_DATE_MINUS_1}' to endpoint APOD`, async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${MIN_DATE_MINUS_1}`);

            expect(response.status).toBe(400);
            expect(response.statusText).toBe('BAD REQUEST');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
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

            expect(responseJSON.msg).toBe(`Date must be between Jun 16, 1995 and ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

            errMessInDate = responseJSON.msg.slice(0, 37);

        });

        it("4. Make GET request with query parameter max 'date=currently date' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${TODAY_DATE}`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, defaultResultJsonModel());

            expect(responseJSON.date).toBe(TODAY_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

        it(`5. Make GET request with query parameter max date + 1 'date=${MAX_DATE_PLUS_1}' to endpoint apod`, async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${MAX_DATE_PLUS_1}`);

            expect(response.status).toBe(400);
            expect(response.statusText).toBe('BAD REQUEST');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
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

            expect(responseJSON.msg).toBe(`${errMessInDate} ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

        });

        it(`6. Make GET request with query parameter random valid date 'date=${RANDOM_DATE}' to endpoint APOD`, async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&date=${RANDOM_DATE}`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
                "type": "object",

                "allOf": [
                    {
                        "$ref": "apod.json#"
                    },
                    {
                        "required": [
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

            expect(responseJSON.date).toBe(RANDOM_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

    }); // describe (Testing query parameter 'date')

    describe("Testing query parameter 'hd'", () => {

        it("7. Make GET request with query parameter 'hd = true' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&hd=true`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
                "type": "object",
                "allOf": [
                    {
                        "$ref": "apod.json#"
                    },
                    {
                        "required": [
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

            expect(responseJSON.date).toBe(TODAY_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

        it("8. Make GET request with query parameter 'hd = false' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?api_key=${API_KEY}&hd=false`);

            expect(response.status).toBe(200);
            expect(response.statusText).toBe('OK');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
            expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, {
                "type": "object",
                "allOf": [
                    {
                        "$ref": "apod.json#"
                    },
                    {
                        "required": [
                            "date",
                            "explanation",
                            "media_type",
                            "service_version",
                            "title",
                            "url"
                        ],
                        "not": {
                            "required": [
                                "hdurl"
                            ]
                        }
                    }
                ]
            });

            expect(responseJSON.date).toBe(TODAY_DATE);
            expect(responseJSON.media_type).toBe(TYPE_IMAGE);

        });

    }); // describe (Testing query parameter 'hd')

    describe("Testing parameter 'API_KEY'", () => {

        it("9. Make GET request with query parameter 'api_key =' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("10. Make GET request with query parameter 'api_key =' and 'hd=true' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?hd=true`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("11. Make GET request with query parameter 'api_key =' and 'hd=false' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?hd=false`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("12. Make GET request with query parameter 'API_KEY =' and 'date=currently' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?date=${getCurrentlyDate()}`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("13. Make GET request with query parameter 'API_KEY=' and 'date=' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?date=`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("14. Make GET request with query parameter 'API_KEY =', 'date=' and 'hd=' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?date=&hd=`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

        it("15. Make GET request with query parameter 'API_KEY =' and 'hd=' to endpoint APOD", async () => {

            let response = await request(`${URL_APOD}?hd=`);

            expect(response.status).toBe(403);
            expect(response.statusText).toBe('Forbidden');
            expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);

            let responseJSON = await transformResponseToJson(response);

            validateJsonSchema(responseJSON, missApiKeyJsonModel());

        });

    }); // describe (Testing parameter 'api_key')

    // TODO TESTING QUERY PARAMETER

    describe('Testing query parameter: date, hd and date', () => {

    }); // describe (Testing query parameter: date, hd and date)

}); // describe (Integration REST-API Testing APOD)