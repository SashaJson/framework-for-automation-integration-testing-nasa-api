'use strict';

const { APOD_URL } = require('../static-data/defaults');

const { verificationResponseWithJsonModel } = require('../helpers/assertResponse');
const r = require('../helpers/requester');

module.exports = {

    async getAstronomyPictureDay(queryParams = {}, expectResponseError = false) {

        queryParams.api_key = process.env.API_KEY;

        const responseBody = await r.get(`${APOD_URL}?` + new URLSearchParams(queryParams));

        verificationResponseWithJsonModel(expectResponseError, responseBody);

        return responseBody;

    }

}
