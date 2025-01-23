import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        margin: "8px 0 8px 0",
        cursor: "pointer"
    },

    block: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    time: {
        ...templates.fonts.large,
        fontWeight: "bold",
        whiteSpace: "nowrap"
    },

    crew: {
        ...templates.fonts.large,
        fontWeight: "bold",
        whiteSpace: "nowrap"
    },

    name: {
        ...templates.fonts.small,
        fontWeight: "normal",
        margin: "0 4px 0 4px",
        textAlign: "center"
    },

    date: {
        ...templates.fonts.xSmall,
        fontWeight: "normal",
        whiteSpace: "nowrap"
    },

    column: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

}
