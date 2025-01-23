import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "8px"
    },

    button: {
        margin: "32px",
        maxWidth: "380px",
        borderRadius: "16px",
        padding: "16px",
        ...templates.fonts.common
    },

    text: {
        color: "#598803",
        ...templates.fonts.common,
        marginTop: "16px"
    },

    form: {

        container: {
            borderRadius: "16px",
            width: "420px"
        },

        caption: {
            ...templates.fonts.common
        },

        content: {
            ...templates.fonts.common,
            textAlign: "center"
        },

        buttons: {

            close: {
                width: "120px",
                ...templates.fonts.common
            }

        }

    }

}
