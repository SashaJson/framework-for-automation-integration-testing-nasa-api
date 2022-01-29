'use strict';

const moment = require('moment');
const { DATE_FORMAT } = require('../static-data/defaults');

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomDate() {

    const validYear = getRandomInteger(1996, 2022);
    const validMouth = getRandomInteger(0, 11);
    const validDate = getRandomInteger(1, 31);

    return moment(`${ validYear }-${ validMouth }-${ validDate }`).format(DATE_FORMAT);
}

module.exports = { getRandomDate }
