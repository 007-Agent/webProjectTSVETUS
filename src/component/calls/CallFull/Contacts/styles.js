import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column"
    },

    block: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    phone: {
        margin: "8px 0 8px 0",
        ...templates.fonts.common
    },

    fio: {
        margin: "8px 0 8px 0",
        ...templates.fonts.common
    }

}
