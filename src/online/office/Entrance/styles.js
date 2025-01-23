import {templates} from "styles";

export default {

    panel: {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }
    },

    scroll: {
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    },

    button: {
        container: {
            width: "180px",
            margin: "8px 0 8px 0"
        }
    },

    group: {
        container: {
            maxWidth: "320px"
        },
        content: {
            justifyContent: "space-around",
            border: "none"
        }
    },

    recover: {
        margin: "8px 0 0 0",
        ...templates.fonts.small,
        cursor: "pointer"
    },

    component: {

        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "320px"
        },

        input: {
            container: {
                margin: "8px 0 8px 0",
            }
        },

        captcha: {

        },

        message: {
            ...templates.fonts.common,
            color: "#1b7a2e"
        }

    }

}
