import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flex: "1",
        margin: "8px 0 8px 0"
    },

    number: {
        textAlign: "left",
        ...templates.fonts.common
    },

    reason: {
        textAlign: "right",
        ...templates.fonts.common
    },
    right: {

    }

}
