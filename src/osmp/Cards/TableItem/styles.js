import {templates} from 'styles';

export default {

    container: {
        position: "relative"
    },

    cell: {
        ...templates.fonts.small,
        ...templates.cell,
        textAlign: "center",
        padding: "4px 0 4px 0",
        cursor: "pointer"
    }

}
