'use strict';

module.exports = {

    getCurrentlyDate: () => {

        const currentlyDateFullFormat = new Date();

        const years = currentlyDateFullFormat.getFullYear();
        let month = currentlyDateFullFormat.getMonth();
        const day = currentlyDateFullFormat.getDate();

        month = {

            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
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

    }

}
