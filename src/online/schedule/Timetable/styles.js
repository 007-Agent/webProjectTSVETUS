import {templates} from 'styles';

export default {

    container: {
    },

    cell: {
        display: "flex",
        alignItems: "stretch",
        padding: "0",
        minHeight: "64px"
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

        top: {
            display: "flex",
            justifyContent: "flex-end",
            with: "100%"
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