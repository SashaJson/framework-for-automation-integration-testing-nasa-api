"use strict";

module.exports = {

    checkStatusCode200: statusCode => {

        if (statusCode !== 200) {
            throw new Error("Ошибка HTTP: " + statusCode);
        }
    },

    transformResponseToJson: async response => {

        const responseJson = await response.json();

        return await responseJson
    },

}