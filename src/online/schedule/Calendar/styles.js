import {templates} from 'styles';

export default {

    container: {
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    button: {
        ...templates.fonts.common,
        color: templates.colors.border,
        padding: "2px 16px 4px 16px"
    },

    date: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },

    month: {
        ...templates.fonts.common,
        color: templates.colors.border
    },

    year: {
        margin: "4px 0 0 0",
        ...templates.fonts.xSmall,
        color: templates.colors.metaText
    }

}