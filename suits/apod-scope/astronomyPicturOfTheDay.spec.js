'use strict';

const moment = require('moment');

const defaults = require('../../static-data/defaults');

const { getRandomDate } = require('../../helpers/randonGenerationData');
const { getCurrentlyDate } = require('../../helpers/utils');

const { getAstronomyPictureDay } = require('../../api/astronomyPictureDay');

const TODAY_DATE = moment().format(defaults.DATE_FORMAT),
    INVALID_DATE = '1991-12-12',
    MINIMAL_DATE = '1995-06-16',
    MINIMAL_DATE_MINUS_1_DAY = '1995-06-15',
    RANDOM_DATE = getRandomDate(),
    MAX_DATE_PLUS_1_DAY = moment().add(1, 'days').format(defaults.DATE_FORMAT);

let errMessInDate;

describe('Integration REST-API Testing APOD', () => {

    describe("Testing query parameter 'date'", () => {

        it('0. Make GET request with default query parameter to endpoint APOD and received correct date', async () => {

            const dataAstronomyDay = await getAstronomyPictureDay();

            expect(dataAstronomyDay.date).toBe(TODAY_DATE);
            expect(dataAstronomyDay.media_type).toBe('image');
            expect(dataAstronomyDay.service_version).toBe('v1');

        });

        it("1. Make GET request with query parameter max 'date=currently date' to endpoint APOD", async () => {

            const dataAstronomyDay = await getAstronomyPictureDay({ date: TODAY_DATE });

            expect(dataAstronomyDay.date).toBe(TODAY_DATE);
            expect(dataAstronomyDay.media_type).toBe('image');
            expect(dataAstronomyDay.service_version).toBe('v1');

        });

        it(`2. Make GET request with query parameter 'date=${INVALID_DATE}' to endpoint APOD and expect 'Error'`, async () => {

            const dataError = await getAstronomyPictureDay({ date: INVALID_DATE }, 'invalidParam');

            expect(dataError.code).toBe(400);
            expect(dataError.msg).toBe(`Date must be between Jun 16, 1995 and ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

        });

        it(`3. Make GET request with query parameter minimal 'date=${MINIMAL_DATE}' to endpoint APOD`, async () => {

            const dataAstronomyDay = await getAstronomyPictureDay({ date: MINIMAL_DATE });

            expect(dataAstronomyDay.date).toBe(MINIMAL_DATE);
            expect(dataAstronomyDay.explanation).toBe('Today\'s Picture:    Explanation:  If the Earth could somehow be transformed to the ultra-high density of a neutron star , it might appear as it does in the above computer generated figure. Due to the very strong gravitational field, the neutron star distorts light from the background sky greatly. If you look closely, two images of the constellation Orion are visible. The gravity of this particular neutron star is so great that no part of the neutron star is blocked from view - light is pulled around by gravity even from the back of the neutron star.   We keep an  archive file.  Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert Nemiroff and Jerry Bonnell.');
            expect(dataAstronomyDay.hdurl).toBe('https://apod.nasa.gov/apod/image/e_lens.gif');
            expect(dataAstronomyDay.media_type).toBe('image');
            expect(dataAstronomyDay.service_version).toBe('v1');
            expect(dataAstronomyDay.title).toBe('Neutron Star Earth');
            expect(dataAstronomyDay.url).toBe('https://apod.nasa.gov/apod/image/e_lens.gif');

        });

        it(`4. Make GET request with query parameter min date - 1 'date=${MINIMAL_DATE_MINUS_1_DAY}' to endpoint APOD`, async () => {

            const dataError = await getAstronomyPictureDay({ date: MINIMAL_DATE_MINUS_1_DAY }, 'invalidParam');

            expect(dataError.code).toBe(400);
            expect(dataError.msg).toBe(`Date must be between Jun 16, 1995 and ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

        });

        it(`5. Make GET request with query parameter random valid date 'date=${RANDOM_DATE}' to endpoint APOD`, async () => {

            const dataAstronomyDay = await getAstronomyPictureDay({ date: RANDOM_DATE });

            expect(dataAstronomyDay.date).toBe(RANDOM_DATE);
            expect(dataAstronomyDay.media_type).toBe('image');
            expect(dataAstronomyDay.service_version).toBe('v1');

        });

        it(`6. Make GET request with query parameter max date + 1 'date=${MAX_DATE_PLUS_1_DAY}' to endpoint apod`, async () => {

            const dataError = await getAstronomyPictureDay({ date: MAX_DATE_PLUS_1_DAY }, 'invalidParam');

            expect(dataError.code).toBe(400);
            expect(dataError.msg).toBe(`Date must be between Jun 16, 1995 and ${getCurrentlyDate().month} ${getCurrentlyDate().day}, ${getCurrentlyDate().years}.`);

        });

    }); // describe (Testing query parameter 'date')

    // describe("Testing query parameter 'hd'", () => {
    //
    //     it("7. Make GET request with query parameter 'hd = true' to endpoint APOD", async () => {
    //
    //         let response = await request(`${URL_APOD}?api_key=${API_KEY}&hd=true`);
    //
    //         expect(response.status).toBe(200);
    //         expect(response.statusText).toBe('OK');
    //         expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
    //         expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);
    //
    //         let responseJSON = await transformResponseToJson(response);
    //
    //         validateJsonSchema(responseJSON, {
    //             "type": "object",
    //             "allOf": [
    //                 {
    //                     "$ref": "apod.json#"
    //                 },
    //                 {
    //                     "required": [
    //                         "date",
    //                         "explanation",
    //                         "hdurl",
    //                         "media_type",
    //                         "service_version",
    //                         "title",
    //                         "url"
    //                     ]
    //                 }
    //             ]
    //         });
    //
    //         expect(responseJSON.date).toBe(TODAY_DATE);
    //         expect(responseJSON.media_type).toBe(TYPE_IMAGE);
    //
    //     });
    //
    //     it("8. Make GET request with query parameter 'hd = false' to endpoint APOD", async () => {
    //
    //         let response = await request(`${URL_APOD}?api_key=${API_KEY}&hd=false`);
    //
    //         expect(response.status).toBe(200);
    //         expect(response.statusText).toBe('OK');
    //         expect(response.headers.get('content-type')).toBe(CONTENT_TYPE);
    //         expect(response.headers.get('x-ratelimit-limit')).toBe(RATE_LIMIT);
    //
    //         let responseJSON = await transformResponseToJson(response);
    //
    //         validateJsonSchema(responseJSON, {
    //             "type": "object",
    //             "allOf": [
    //                 {
    //                     "$ref": "apod.json#"
    //                 },
    //                 {
    //                     "required": [
    //                         "date",
    //                         "explanation",
    //                         "media_type",
    //                         "service_version",
    //                         "title",
    //                         "url"
    //                     ],
    //                     "not": {
    //                         "required": [
    //                             "hdurl"
    //                         ]
    //                     }
    //                 }
    //             ]
    //         });
    //
    //         expect(responseJSON.date).toBe(TODAY_DATE);
    //         expect(responseJSON.media_type).toBe(TYPE_IMAGE);
    //
    //     });
    //
    // }); // describe (Testing query parameter 'hd')

}); // describe (Integration REST-API Testing APOD)
