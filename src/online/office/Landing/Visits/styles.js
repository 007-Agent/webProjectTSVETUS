import {templates} from 'styles';

export default {

    text: {
        marginBottom: "32px",
        textAlign: "center",
        ...templates.fonts.small
    },

    visits: {
        container: {

        }
    },

    patient: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px",
            textAlign: "center",
            border: "2px solid " + templates.colors.frame,
            padding: "16px",
            borderRadius: "16px",
            color: templates.colors.border
        },
        name: {
            ...templates.fonts.common,
            color: templates.colors.metaText
        }
    },

    visit: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0 0 0",
            textAlign: "center",
            color: templates.colors.border
        },
        date: {
            ...templates.fonts.small
        },
        speciality: {
            ...templates.fonts.xSmall
        },
        resource: {
            ...templates.fonts.common,
            color: templates.colors.metaText
        },
        room: {
            ...templates.fonts.xSmall
        }
    },

    caption: {
        textAlign: "center",
        ...templates.fonts.common,
        color: templates.colors.metaText,
        margin: "16px 0 0 0"
    }

}
