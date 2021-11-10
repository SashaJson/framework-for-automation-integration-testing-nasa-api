'use strict';

module.exports = () => ({
    "type": "object",
    "allOf": [
        {
            "$ref": "apod.json#"
        },
        {
            "required": [
                "date",
                "explanation",
                "media_type",
                "service_version",
                "title",
                "url"
            ]
        }
    ]
})
