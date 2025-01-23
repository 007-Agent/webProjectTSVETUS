import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "72px",
        padding: "16px",
        backgroundColor: templates.colors.panel
    },

    logo: {
        flexShrink: "0",
        width: "64px",
        height: "64px"
    },

    title: {

        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
            fontFamily: "Times new roman",
            textAlign: "center"
        },

        header: {
            fontSize: "10px"
        },

        content: {
            fontSize: "28px",
            fontWeight: "bold"
        },

        footer: {
            fontSize: "10px"
        }

    },

    home: {

        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: "0",
            cursor: "pointer"
        },

        icon: {
            width: "48px",
            height: "48px"
        },

        back: {
            fontSize: "12px"
        }

    }

}