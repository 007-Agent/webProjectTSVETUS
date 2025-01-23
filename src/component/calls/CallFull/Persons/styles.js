import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "16px 0 16px 0"
    },

    doctor: {
        ...templates.fonts.common,
        margin: "0 4px 0 0",
        color: templates.colors.border
    },

    assistant: {
        ...templates.fonts.common,
        margin: "0 0 0 4px",
        color: templates.colors.border
    }

}
