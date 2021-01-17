"use strict";

const util = require("util");

module.exports = {

    transformResponseToJson: async response => {

        const responseJson = await response.json();

        console.log(util.inspect(responseJson, {
            showHidden: true,
            depth: null,
            compact: false,
            maxArrayLength: null
        }));

        return await responseJson
    },

    getCurrentlyDate: () => {

        const currentlyDateFullFormat = new Date();

        const years = currentlyDateFullFormat.getFullYear();
        let month = currentlyDateFullFormat.getMonth();
        const day = currentlyDateFullFormat.getDate();

        month = {

            0: "Jan",
            1: "Feb",
            2: "March",
            3: "April",
            4: "May",
            5: "Jun",
            6: "July",
            7: "August",
            8: "September",
            9: "Oct",
            10: "Nov",
            11: "Dec"

        }[month];

        return {
            years: years,
            month: month,
            day: day
        }
    },

    checkAllResponse: res => {

        console.log(util.inspect(res, {
            showHidden: true,
            depth: null,
            compact: false,
            maxArrayLength: null
        }));

    }

}