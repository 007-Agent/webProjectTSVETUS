import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 0 32px 0"
    },

    text: {
        textAlign: "center",
        ...templates.fonts.small,
        margin: "0 0 8px 0",
        color: templates.colors.border
    },

    button: {
        container: {
            width: "220px",
            ...templates.fonts.small
        }
    }

}
