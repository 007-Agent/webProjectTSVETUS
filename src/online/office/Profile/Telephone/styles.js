import {templates} from 'styles';

export default {

    text: {
        textAlign: "center",
        margin: "16px",
        color: templates.colors.border,
        ...templates.fonts.small,
        cursor: "pointer"
    },

    group: {
        margin: "0 0 16px 0"
    },

    input: {
        container: {
            margin: "8px 0 0 0",
            width: "200px"
        },
        edit: {
            textAlign: "center",
            minHeight: "38px"
        }
    },

    button: {
        container: {
            margin: "8px 0 8px 0"
        }
    },

    form: {
        container: {
            maxWidth: "320px"
        },
        content: {
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        button: {
            container: {
                margin: "8px",
                width: "200px"
            }
        },
        footer: {
            padding: "16px"
        }
    }

}
