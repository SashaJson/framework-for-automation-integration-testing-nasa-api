'use strict';

module.exports = {

    status200: statusCode => {

        if (statusCode !== 200) {
            throw new Error('Error HTTP: ' + statusCode);
        }

    },

    status400: statusCode => {

        if (statusCode !== 400) {
            throw new Error('Error HTTP: ' + statusCode);
        }

    },

    status403: statusCode => {

        if (statusCode !== 403) {
            throw new Error('Error HTTP: ' + statusCode);
        }

    }

}