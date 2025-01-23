import {templates} from 'styles';

export default {

    panel: {
        container: {
            textAlign: "center"
        }
    },

    profile: {
        display: "flex",
        flexDirection: "column",
        minWidth: "320px",
        maxWidth: "420px"
    },

    birthday: {
        container: {
            margin: "8px 0 8px 0",
            width: "170px"
        }
    },

    gender: {
        container: {
            margin: "8px 0 8px 0",
            width: "100px"
        }
    },

    box: {
        display: "flex",
        justifyContent: "space-between"
    },

    input: {
        container: {
            margin: "8px 0 8px 0",
        }
    },

    scroll: {
        content: {
            display: "flex",
            justifyContent: "center"
        }
    },

    button: {
        container: {
            margin: "8px 0 0 0"
        }
    },

    text: {
        textAlign: "center",
        margin: "16px",
        color: templates.colors.border,
        ...templates.fonts.small,
        cursor: "pointer"
    }

}