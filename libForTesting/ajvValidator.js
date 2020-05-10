"use strict";

const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true
});

module.exports = {

    validationCheckJsonSchema: (jsonSchemaReceivedFromServer, validJsonSchema) => {

        const validate = ajv.compile(validJsonSchema);
        const valid = validate(jsonSchemaReceivedFromServer);

        if (!valid) {
            throw new Error("JSON-Schema invalid")
        }

    }

}