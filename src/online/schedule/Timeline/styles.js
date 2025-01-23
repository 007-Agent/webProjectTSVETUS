import {templates} from 'styles';

export default {

    container: {
    },

    caption: {
        ...templates.fonts.small
    },

    cell: {
        display: "flex",
        alignItems: "stretch",
        padding: "0",
    },

    frame: {

        cell: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "8px",
            backgroundColor: templates.colors.panel
        },

        active: {
            backgroundColor: templates.colors.window
        },

        current: {
            border: "2px solid red"
        },

        date: {
            ...templates.fonts.small,
            color: templates.colors.border,
            fontWeight: "bold"
        },

        dateActive: {
            color: templates.colors.metaText,
        },

        time: {
            ...templates.fonts.small,
            color: templates.colors.text,
            fontWeight: "bold"
        }

    }


}