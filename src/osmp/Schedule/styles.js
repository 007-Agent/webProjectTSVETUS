import {templates} from 'styles';

export default {

    container: {

    },

    panel: {
        container: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-end"
        }
    },

    scroll: {
        content: {
            padding: "0 16px 0 16px"
        }
    },

    department: {
        container: {
            margin: "0 0 0 16px",
            width: "380px"
        }
    },

    person: {
        container: {
            margin: "0 0 0 16px",
            width: "380px"
        }
    },

    date: {
        container: {
            margin: "0 0 0 16px",
            width: "220px",
            borderBottom: "none",
        },
        edit: {
            border: "1px solid " + templates.colors.border,
            textAlign: "left"
        }
    }

}
