"use strict";

module.exports = () => {
    return {
        "type": "object",
        "required": ["error"],
        "properties": {
            "error": {
                "type": "object",
                "required": [
                    "code",
                    "message"
                ],
                "additionalProperties": false,
                "properties": {
                    "code": {
                        "type": "string",
                        "trim": true,
                        "const": "API_KEY_MISSING",
                    },
                    "message": {
                        "type": "string",
                        "trim": true,
                        "const": "No api_key was supplied. Get one at https://api.nasa.gov:443"
                    }
                }
            }
        }
    }
}