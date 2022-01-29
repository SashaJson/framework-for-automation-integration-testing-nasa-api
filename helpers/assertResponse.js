'use strict';

const invalidParameterJsonModel = require('../json-schemas/response-models/invalidParameter');
const defaultJsonModel = require('../json-schemas/response-models/defaultResult');
const apiKeyMissingJsonModel = require('../json-schemas/response-models/apiKeyMissing');

const validateJsonSchema = require('../helpers/validation-json-schemas');

function verificationResponseWithJsonModel(expectError, responseBody, jsonSchema = defaultJsonModel()) {
    if (!expectError) {
        validateJsonSchema(responseBody, jsonSchema);
    } else {
        ({
            'invalidParam': () => validateJsonSchema(responseBody, invalidParameterJsonModel()),
            'apiKeyMiss': () => validateJsonSchema(responseBody, apiKeyMissingJsonModel())
        })[expectError]();

    }
}

module.exports = { verificationResponseWithJsonModel };
