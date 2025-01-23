import {templates} from 'styles';

export default {

    caption: {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        username: {
            ...templates.fonts.small,
            color: templates.colors.metaText,
            margin: "0 0 4px 0"
        },
        content: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    },

    top: {
        container: {
        }
    }

}