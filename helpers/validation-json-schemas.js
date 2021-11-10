'use strict';

const Ajv = require('ajv'),
    ajv = new Ajv.default({ ajvErrors: true, strict: true });

const inspect = require('util').inspect;

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

ajv.addSchema(require('../json-schemas/definitionsJson/definitions.json', 'definitions.json'));
ajv.addSchema(require('../json-schemas/models-json/apod.json', 'apod.json'));

module.exports = (jsonSchemaFromServer, validJsonSchema) => {

    const validate = ajv.compile(validJsonSchema);

    const validJson = validate(jsonSchemaFromServer);

    if (!validJson) {
        throw new Error('Json Schema validation error. Details: ' +
            JSON.stringify({ validationError: validate.errors }, null, 2) + '\n'+
            'Json Schema with Error from server: ' + inspect(jsonSchemaFromServer, { showHidden: false, depth: null }));
    }

    console.log('Json Schema from server: ' + inspect(jsonSchemaFromServer, { showHidden: false, depth: null, colors: true }));

}
