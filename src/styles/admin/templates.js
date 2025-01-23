import colors from './colors.js';
import fonts from './fonts.js';
import cells from './cells.js';
import borders from './borders.js';

export default {

    colors: colors,

    fonts: fonts,

    cells: cells,

    borders: borders,

    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

    days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

    formats: {
        date: {mask: 'DD.MM.YYYY', empty: '_', full: true, type: 'iso'},
        time: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'}
    },

    TComponent: {
        nestedIcon: true
    }

}
