import {templates} from 'styles';

export default {

    group: {
        content: {
            justifyContent: "flex-end",
            alignItems: "flex-end"
        }
    },

    distance: {
        container: {
            width: "160px",
            margin: "16px 16px 0 16px",
            border: "none",
            borderBottom: templates.borders.light
        },
        edit: {
            border: "none",
            textAlign: "center",
            ...templates.fonts.large
        }
    },

    text: {
        margin: "16px 0 0 0",
        ...templates.fonts.common
    }

}
