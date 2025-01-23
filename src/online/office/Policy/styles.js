import {templates} from 'styles';

export default {

    container: {
    },

    modal: {
        container:{
            maxWidth: "800px",
            minWidth: "320px",
            width: "90%"
        },
        content: {
            width: "100%",
            padding: "4px"
        }

    },

    text: {
        ...templates.fonts.small,
        textAlign: "justify"
    },

    buttons: {

        container: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            boxSizing: "border-box",
            padding: "16px",
            width: "100%"
        },

        agree: {
            ...templates.fonts.small,
            fontWeight: "bold",
            background: "#AAFF99"
        },

        disagree: {
            ...templates.fonts.small,
            fontWeight: "bold",
            background: "#FFAA99"
        }

    }

}
