'use strict';

const util = require('util'),
    Ajv = require('ajv');

const ajv = new Ajv({
    meta: true,
    unknownFormats: 'ignore',
    allErrors: true
});

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
ajv.addSchema(require('../json-schemas/definitionsJson/definitions.json', 'definitions.json'));
ajv.addSchema(require('../json-schemas/models-json/apod.json', 'apod.json'));

module.exports = (jsonSchemaReceivedFromServer, validJsonSchema) => {

    let validate = ajv.compile(validJsonSchema);
    let valid = validate(jsonSchemaReceivedFromServer);

    if (!valid) {
        throw new Error('JSON-Schema invalid!' +
            ' Error in validate JSON-Schema: ' + JSON.stringify(validate.errors) +
            ' Must will be: ' +
            util.inspect(validJsonSchema, {
                showHidden: false,
                depth: null,
                compact: true,
                maxArrayLength: null
            }) +
            ' Received response: ' +
            util.inspect(jsonSchemaReceivedFromServer, {
                showHidden: false,
                depth: null,
                compact: true,
                maxArrayLength: null
            }));
    }

    util.inspect(jsonSchemaReceivedFromServer, {showHidden: false, depth: null});

}