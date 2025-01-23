import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column"
    },

    panel: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 0 0 0"
        }
    },

    caption: {
        margin: "8px 0 16px 0"
    },

    controls: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "100%"
    },

    calendar: {
        container: {
            margin: "8px 0 0 0",
            padding: "0 8px 0 8px",
            width: "100%",
            maxWidth: "920px"
        }
    },

    scroll: {
        container: {
            margin: "8px 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        content: {
            padding: "0 8px 0 8px",
            maxWidth: "920px",
            width: "100%"
        }
    },

    component: {
        container: {
            margin: "2px 8px 2px 8px",
            flex: "1 1100%",
            width: "100%",
            maxWidth: "380px"
        },
        caption: {
            ...templates.fonts.small
        }
    }

}