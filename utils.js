"use strict";

const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true
});

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

    validationCheckJsonSchema: (jsonSchemaReceivedFromServer, validJsonSchema) => {

        const validate = ajv.compile(validJsonSchema);
        const valid = validate(jsonSchemaReceivedFromServer);

        if (!valid) {
            throw new Error("JSON-Schema invalid")
        }

    }

}