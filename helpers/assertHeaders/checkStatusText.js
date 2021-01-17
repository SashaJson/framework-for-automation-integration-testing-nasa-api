'use strict';

module.exports = {

    statusTextOk: statusText => {

        if (statusText !== 'OK') throw new Error('Error HTTP: ' + statusText);

    },

    statusTextBadRequest: statusText => {

        if ( statusText !== 'BAD REQUEST') throw new Error('Error HTTP: ' + statusText);

    },

    statusTextForbidden: statusText => {

        if ( statusText !== 'Forbidden') throw new Error('Error HTTP: ' + statusText);

    }

}