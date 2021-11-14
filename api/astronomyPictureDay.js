'use strict';

const { APOD_URL } = require('../static-data/defaults');

const { verificationResponseWithJsonModel } = require('../helpers/assertResponse');
const r = require('../helpers/requester');

module.exports = {

    async getAstronomyPictureDay(expectResponseError = false) {

        const responseBody = await r.get(`${APOD_URL}?api_key=${process.env.API_KEY}`);

        verificationResponseWithJsonModel(responseBody, expectResponseError);

        return responseBody;

    }

}
