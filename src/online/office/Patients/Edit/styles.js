import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },

    box: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        margin: "16px 0 0 0"
    },

    nib: {
        container: {
            margin: "8px",
            width: "120px"
        }
    },

    pin: {
        container: {
            margin: "8px",
            width: "200px"
        }
    },

    text: {
        margin: "16px 0 0 0",
        ...templates.fonts.small,
        color: templates.colors.border,
        textAlign: "center"
    },

    button: {
        container: {
            margin: "8px",
            ...templates.fonts.small
        }
    }

}