"use strict";

const moment = require("moment");
const generationInteger = require('./getRandomInteger');

module.exports ={

    randomValidDate: () => {
        const dateFormat = "YYYY-MM-DD";

        const validYear =  generationInteger.getRndInteger(1996, 2020);
        const validMouth = generationInteger.getRndInteger(0, 11);
        const validDate = generationInteger.getRndInteger(1, 31);

        return moment(`${validYear}-${validMouth}-${validDate}`).format(dateFormat)
    }
}