import {templates} from 'styles';

export default {

    container: {
        margin: "16px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    button: {
        container: {
            margin: "16px 0 0 0",
            width: "220px",
            flex: "0",
            ...templates.fonts.small
        }
    },

    memo: {
        container: {
            width: "100%"
        },
        edit: {
            minHeight: "80px"
        }
    },

    captcha: {
        container: {
            margin: "16px 0 0 0",
            backgroundColor: templates.colors.window
        }
    },

    input: {
        container: {
            margin: "16px 0 0 0",
            width: "220px",
            flex: "0"
        }
    }

}
