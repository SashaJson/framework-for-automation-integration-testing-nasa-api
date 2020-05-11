"use strict";

module.exports = {

    Status200: statusCode => {

        if (statusCode !== 200) {
            throw new Error("Ошибка HTTP: " + statusCode);
        }
    },

    Status400: statusCode => {

        if (statusCode !== 400) {
            throw new Error("Ошибка HTTP: " + statusCode);
        }
    },

}