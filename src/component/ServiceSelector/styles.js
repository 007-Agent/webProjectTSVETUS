import {templates} from 'styles';

export default {

    container: {
        width: "100%"
    },

    search: {
        container: {
            border: "none",
            padding: "0"
        },
        service: {
            container: {
                borderBottom: "none",
                border: "none"
            },
            edit: {
                ...templates.fonts.common,
                backgroundImage: "linear-gradient(to right, " + templates.colors.shadow + ", " + templates.colors.window + ")",
                backgroundColor: templates.colors.shadow,
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px 4px 8px"
            }
        }
    },

    bottom: {
        display: "flex",
        justifyContent: "flex-end"
    },

    where: {
        container: {
            margin: "8px 0 0 0",
            border: "none",
            cursor: "pointer",
            width: "220px"
        },
        edit: {
            textAlign: "center",
            backgroundImage: "linear-gradient(to right, " + templates.colors.shadow + ", " + templates.colors.window + ")",
            backgroundColor: templates.colors.shadow,
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px 4px 8px"
        }
    }

}
