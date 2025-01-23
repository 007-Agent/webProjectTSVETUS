import {templates} from 'styles';

export default {

    container: {
        container: {
            width: "500px"
        },
        content: {
            padding: "16px"
        },
        button: {
            width: "auto",
            margin: "4px",
            message: {color: "#1e4c0f"},
            continue: {color: "#131868"},
            borderColor: templates.colors.frame
        }
    },

    times: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    },

    top: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    },

    type: {
        container: {
            margin: "16px 0 16px 0",
            maxWidth: "180px",
            width: "100%",
            borderBottom: "1px solid " + templates.colors.border
        },
        edit: {
            border: "none",
            textAlign: "center"
        }
    },

    timeFrom: {
        container: {
            margin: "16px 0 16px 0",
            maxWidth: "220px",
            width: "100%"
        }
    },

    timeTo: {
        container: {
            margin: "16px 0 16px 0",
            maxWidth: "180px",
            width: "100%"
        }
    },

    crew: {
        container: {
            margin: "16px 0 16px 0",
            maxWidth: "180px",
            width: "100%",
            borderBottom: "1px solid " + templates.colors.border
        },
        edit: {
            border: "none"
        }
    },

    date: {
        container: {
            margin: "16px 0 16px 0",
            maxWidth: "220px",
            width: "100%"
        }
    },

    department: {
        container: {
            margin: "16px",
            maxWidth: "480px",
            flex: "1 1 auto",
            width: "100%"
        },
        edit: {
            minHeight: "36px"
        }
    },

    person: {
        container: {
            margin: "16px",
            maxWidth: "480px",
            flex: "1 1 auto",
            width: "100%"
        },
        edit: {
            minHeight: "36px"
        }
    },

    refs: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    }

}
