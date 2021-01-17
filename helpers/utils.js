'use strict';

const util = require('util');

module.exports = {

    transformResponseToJson: async response => {

        let responseJson = await response.json();

        console.log(util.inspect(responseJson, {
            showHidden: true,
            depth: null,
            compact: false,
            maxArrayLength: null
        }));

        return responseJson;

    },

    getCurrentlyDate: () => {

        let currentlyDateFullFormat = new Date();

        let years = currentlyDateFullFormat.getFullYear();
        let month = currentlyDateFullFormat.getMonth();
        let day = currentlyDateFullFormat.getDate();

        month = {

            0: 'Jan',
            1: 'Feb',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'Jun',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'

        }[month];

        return {
            years: years,
            month: month,
            day: day
        };

    },

    checkAllResponse: res => {

        console.log(util.inspect(res, {
            showHidden: true,
            depth: null,
            compact: false,
            maxArrayLength: null
        }));

    },

    getCurlRequest: (
        url,
        method,
        data
    ) => {

        switch (method) {

            case 'GET':
                console.log(util.inspect(`curl --request ${method} '${url}'`, {
                    showHidden: false,
                    depth: null
                }));
                break;

            case 'POST':
                console.log(util.inspect(`curl --request ${method} '${url}' --header 'Content-Type: application/json' --data-raw '${JSON.stringify(data)}'`, {
                    showHidden: false,
                    depth: null
                }));
                break;

            case 'PUT':
                console.log(util.inspect(`curl --request ${method} '${url}' --header 'Content-Type: application/json' --data-raw '${JSON.stringify(data)}'`, {
                    showHidden: false,
                    depth: null
                }));
                break;

            case 'DELETE':
                console.log(util.inspect(`curl --request ${method} '${url}' --data-raw ''`, {
                    showHidden: false,
                    depth: null
                }));
                break;

            default:
                throw new Error('Method undefine');
        }

    }

}