'use strict';

module.exports = {

    //---------------Configurations for API-NASA---------------

    API_KEY: 'vidkL09R9ihkBAcesBGRgQtwiJkSfXQcToZi1aov',
    URL_APOD: 'https://api.nasa.gov/planetary/apod',
    RATE_LIMIT: '2000',


    //---------------Global configurations for Jest---------------

    JEST_TIMEOUT: 40 * 1000,


    //---------------Parameters for Headers---------------

    CONTENT_TYPE: 'application/json',


    //---------------Format Dates-------------------------

    DATE_FORMAT: 'YYYY-MM-DD',
    INVALID_DATE: '1919-03-06',
    MINIMAL_DATE: '1995-06-16',
    MIN_DATE_MINUS_1: '1995-06-15',

    //--------------Type Images--------------------------

    TYPE_IMAGE: 'image',

}