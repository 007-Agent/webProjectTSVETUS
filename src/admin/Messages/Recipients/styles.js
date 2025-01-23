import {templates} from 'styles';
export default {
    container: {
        border: "1px solid" + templates.colors.border
    },
    head: {
        borderBottom: "1px solid" + templates.colors.border,
        textAlign: "center",
        padding: "8px",
        ...templates.fonts.small
    },
    scroll: {
        container: {
            margin: "8px 0 0 0"
        },
        content: {
            padding: "0"
        }
    },

    table: {
        container: {
            ...templates.fonts.small
        },
        caption: {
            ...templates.fonts.xSmall
        },
        cell: {
            textAlign: "center"
        }
    },
    list: {
        margin: "8px"
    },
    label: {

    },
    group:{
        ...templates.fonts.small
    },
    string:{
        ...templates.fonts.xsmall
    }
}
