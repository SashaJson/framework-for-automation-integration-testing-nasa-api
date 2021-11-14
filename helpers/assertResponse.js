'use strict';

const defaultJsonModel = require('../json-schemas/response-models/defaultResult');
const errorJsonModel = require('../json-schemas/response-models/apiKeyMissing');

const validateJsonSchema = require('../helpers/validation-json-schemas');

function verificationResponseWithJsonModel(responseBody, error) {
    if (!error) {
        validateJsonSchema(responseBody, defaultJsonModel());
    } else {
        validateJsonSchema(responseBody, errorJsonModel());
    }
}

module.exports = { verificationResponseWithJsonModel };
