import {templates} from 'styles';

export default {

    panel: {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end"
        }
    },

    date: {
        container: {
            margin: "8px",
            width: "240px",
            borderBottom: "none"
        }
    },

    check: {
        container: {
            margin: "8px",
            width: "180px"
        }
    },

    list: {
        container: {
            flex: "1 1 400px"
        }
    },

    detail: {
        container: {
            flex: "1 1 100%"
        }
    },

    link: {
        textAlign: "center",
        color: "#a14051"
    },

    table: {
        caption: {
            ...templates.fonts.xSmall
        },
        cell: {
            ...templates.fonts.xSmall
        }
    }

}