import {templates} from 'styles';

export default {

    form: {
        container: {
            width: "100%",
            maxWidth: "800px"
        },
        content: {
        },
        buttons: {
            message: {color: "#1e4c0f"},
            continue: {color: "#131868"}
        }
    },

    title: {
        padding: "8px"
    },

    check: {
        container: {
            width: "320px"
        }
    },

    table: {
        container: {
            ...templates.fonts.small
        },
        cell: {
            textAlign: "center"
        },
        button: {
            container: {
                ...templates.fonts.tiny,
                padding: "8px",
            }
        }
    }

}