import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "8px"
    },

    name: {
//        maxWidth: "360px",
        margin: "0 4px 0 4px",
        fontStyle: "italic",
        ...templates.fonts.small
    },

    unit: {
        width: "60px",
        margin: "0 4px 0 4px",
        fontStyle: "italic",
        ...templates.fonts.small
    },

    count: {
        container: {
            width: "40px",
            margin: "0 4px 0 4px",
            border: templates.borders.lightDash,
            alignItems: "center"
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.small,
            minHeight: "18px"
        }
    },

    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "108px"
    },

    material: {

    }

}
