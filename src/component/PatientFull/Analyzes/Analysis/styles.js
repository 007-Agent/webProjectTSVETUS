import {templates} from 'styles';

export default {

    popup: {
        container: {
            margin: "16px 0 16px 0"
        },
        content: {
            margin: "0 0 0 16px"
        },
        label: {
            margin: "0",
            width: "100%"
        }
    },

    row: {
        display: "flex",
        flexWrap: "wrap",
        ...templates.fonts.small,
        color: templates.colors.text,
        alignItems: "center",
        width: "100%"
    },

    date: {
        margin: "0 8px 0 0",
        color: templates.colors.border
    },

    caption: {
        fontStyle: "italic"
    }

}
