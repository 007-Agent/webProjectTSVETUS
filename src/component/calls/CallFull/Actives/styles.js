import {templates} from 'styles';

export default {

    line: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },

    date: {
        container: {
            margin: "16px 4px 16px 0",
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

    hours: {
        container: {
            margin: "16px 0 16px 4px",
            width: "160px"
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.large
        },
        label: {
            ...templates.fonts.common
        },
        icon: {
            color: "#0a3",
            width: "28",
            height: "28",
            margin: "0 0 3px 8px",
            flexShrink: "0"
        }
    }

}
