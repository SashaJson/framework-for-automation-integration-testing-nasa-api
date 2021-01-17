"use strict";

const moment = require("moment");
const generationInteger = require('./getRandomInteger');

module.exports = () => {

    const DATE_FORMAT = "YYYY-MM-DD";

    const validYear = generationInteger(1996, 2020);
    const validMouth = generationInteger(0, 11);
    const validDate = generationInteger(1, 31);

    return moment(`${validYear}-${validMouth}-${validDate}`).format(DATE_FORMAT)

}