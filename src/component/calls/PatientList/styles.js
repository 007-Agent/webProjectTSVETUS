import {templates} from 'styles';

export default {

    container: {

    },

    panel: {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end"
        }
    },

    patient: {
        container: {
            border: "none",
            borderBottom: "1px dotted #ddd",
            margin: "16px 16px 16px 0",
            width: "380px",
            flexShrink: "0"
        }
    },

    scroll: {
        content: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-around",
            flexWrap: "wrap"
        }
    },

    input: {
        container: {
            width: "380px",
            borderBottom: "none"
        },
        edit: {
            border: '1px solid ' + templates.colors.frame,
            borderRadius: "4px"
        },
        icon: {
            width: "32px",
            height: "32px"
        }
    }

}
