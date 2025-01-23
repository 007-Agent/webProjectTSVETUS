import {templates} from 'styles';

export default {

    container: {

    },

    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },

    password: {
        container: {
            width: "200px",
            margin: "16px 0 0 0"
        }
    },

    button: {
        container: {
            width: "200px",
            margin: "16px 0 0 0"
        }
    },

    back: {
        margin: "16px 0 0 0",
        ...templates.fonts.common,
        color: templates.colors.border
    }

}
