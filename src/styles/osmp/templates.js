import colors from './colors.js';
import fonts from './fonts.js';
import borders from './borders.js';
import cells from './cells.js';

export default {

    colors: colors,

    fonts: fonts,

    borders: borders,

    cells: cells,

    months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],

    days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

    formats: {
        date: {mask: 'DD.MM.YYYY', empty: '_', full: true, type: 'iso'},
        time: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'}
    }

}
