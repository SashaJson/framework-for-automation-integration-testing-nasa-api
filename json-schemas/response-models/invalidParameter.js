'use strict';

module.exports = () => ({
    "type": "object",
    "allOf": [
        {
            "$ref": "apod.json#"
        },
        {
            "required": [
                "code",
                "msg",
                "service_version"
            ]
        }
    ]
})
