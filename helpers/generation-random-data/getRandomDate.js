'use strict';

const moment = require('moment');
const generationInteger = require('./getRandomInteger');

module.exports = () => {

    const DATE_FORMAT = 'YYYY-MM-DD';

    let validYear = generationInteger(1996, 2020);
    let validMouth = generationInteger(0, 11);
    let validDate = generationInteger(1, 31);

    return moment(`${validYear}-${validMouth}-${validDate}`).format(DATE_FORMAT);

}