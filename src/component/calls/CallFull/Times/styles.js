import {templates} from 'styles';

export default {

    group: {

        container: {
        },

        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flex: "1"
        }

    },

    block: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        flex: "1",
        width: "100%"
    },

    time: {
        container: {
            width: "240px",
            margin: "0 8px 8px 8px"
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.large
        },
        label: {
            width: "112px",
            ...templates.fonts.common
        }
    },

    text: {

    }

}
