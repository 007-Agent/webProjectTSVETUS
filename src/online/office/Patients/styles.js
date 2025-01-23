import {templates} from 'styles';

export default {

    panel: {
        container: {
            display: "flex",
            justifyContent: "center"
        }
    },

    scroll: {
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }
    },

    caption: {
        container: {
            maxWidth: "920px"
        }
    },

    patients: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "100%"
    },

    patient: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "8px",
            padding: "16px",
            border: "2px solid " + templates.colors.frame,
            borderRadius: "16px",
            cursor: "pointer"
        },
        name: {
            ...templates.fonts.common,
            color: templates.colors.metaText
        },
        age: {
            margin: "8px 0 0 0",
            ...templates.fonts.small,
            color: templates.colors.border
        }
    },

    full: {
        container: {
            maxWidth: "920px"
        }
    }

}
