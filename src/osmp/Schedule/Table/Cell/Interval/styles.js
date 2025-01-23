import {templates} from 'styles';

export default {

    container: {
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "38px",
        minWidth: "48px"
    },

    crew: {
        color: "red",
        ...templates.fonts.xSmall,
        fontWeight: "bold"
    },

    dispatcher: {
        color: "blue",
        ...templates.fonts.xSmall,
        fontWeight: "bold"
    },

    time: {
        color: "black",
        ...templates.fonts.xSmall,
        fontWeight: "bold"
    },

    visit: {
        color: "#8ddd6d"
    }

}
