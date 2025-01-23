import {templates} from 'styles';

export default {

    container: {
        width: "520px",
        margin: "8px 0 0 8px",
        borderRadius: "8px",
        padding: "8px"
    },

    row: {
        display: "flex",
        justifyContent: "space-around",
        margin: "8px 8px 0 8px",
        color: templates.colors.border,
        ...templates.fonts.common
    },

    pat: {
        width: "100%",
        textAlign: "center",
        margin: "8px 0 0 0",
        color: templates.colors.text,
        fontWeight: "bold",
        ...templates.fonts.small
    }

}
