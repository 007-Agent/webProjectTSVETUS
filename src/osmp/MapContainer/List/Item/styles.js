import {templates} from 'styles';

export default {

    container: {
        width: "520px",
        margin: "4px",
        borderRadius: "8px",
        padding: "8px"
    },

    row: {
        display: "flex",
        justifyContent: "space-between",
        margin: "4px 4px 0 4px",
        color: templates.colors.border,
        ...templates.fonts.small
    },

    pat: {
        display: "flex",
        justifyContent: "center",
        margin: "4px 4px 0 4px",
        color: templates.colors.text,
        fontWeight: "bold",
        ...templates.fonts.xSmall
    },

    check: {
        container: {
            margin: "0 0 0 16px",
            border: "none",
            width: "120px"
        }
    },

    address: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "4px 4px 0 4px",
        textAlign: "center",
        ...templates.fonts.xSmall
    },

    time: {
        margin: "0 16px 0 0 0",
        textAlign: "left",
        color: "#AA2233",
        fontWeight: "bold",
        ...templates.fonts.small
    },

    bottom: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
        margin: "8px 4px 0 4px",
        minHeight: "28px"
    }

}
