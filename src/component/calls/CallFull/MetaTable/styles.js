import {templates} from 'styles';

export default {

    group: {

        container: {
        },

        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            flex: "1"
        }

    },

    input: {
        container: {
            margin: "0",
            border: "none"
        },
        edit: {
            ...templates.fonts.common,
            margin: "0",
            padding: "0",
            textAlign: "center",
            minHeight: "32px",
            border: "none"
        },
        label: {
            ...templates.fonts.common
        },
        item: {
            ...templates.fonts.common
        }
    },

    head: {
        ...templates.cells.light,
        ...templates.fonts.small,
        color: templates.colors.border,
        textAlign: "center",
        padding: "2px"
    },

    value: {
        ...templates.cells.light,
        ...templates.fonts.common,
        padding: "4px",
        align: "center",
        minHeight: "32px"
    },

    table: {
        borderCollapse: "collapse"
    }

}
