import {templates} from 'styles';

export default {

    services: {
        container: {
            margin: "0",
            padding: "0"
        },
        group: {
            container: {
                margin: "0",
                padding: "0",
                width: "100%"
            },
            content: {
                border: "none",
                padding: "0",
                margin: "0"
            }
        }
    },

    date: {
        container: {
            margin: "8px 0 0 0",
            width: "300px"
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.large
        },
        label: {
            ...templates.fonts.common
        }
    },

    box: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%"
    },

    medicaments: {

    }

}
