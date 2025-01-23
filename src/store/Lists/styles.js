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
            width: "260px",
            borderBottom: "none"
        }
    },

    check: {
        container: {
            margin: "8px",
            width: "280px"
        }
    },

    detail: {
        container: {
            flex: "1 1",
            height: "280px"
        }
    },

    tabs: {
        container: {margin: "8px 0 8px 0"},
        content: {
            justifyContent: "space-around",
            padding: "8px 0 8px 0"
        },
        control: {
            container: {
                width: "300px",
                margin: "8px"
            },
            down: {
                backgroundColor: "#438d39",
                fontWeight: "bold",
                color: "#fff"
            }
        }
    },

    link: {
        textAlign: "center",
        color: "#a14051"
    },

    container: {
        flexDirection: "column"
    },

    table: {
        marginTop: "8px",
        caption: {
            ...templates.fonts.xSmall
        },
        cell: {
            ...templates.fonts.xSmall
        }
    },
    form: {
        container: {
            width: "80%",
            maxWidth: "1000px"
        },
        content: {
            padding: "16px"
        },
        buttons: {
            message: {color: "#1e4c0f"},
            continue: {color: "#131868"}
        }
    },
    formContent: {
        flex: "1 1 100%",
        padding: "8px",
        border: "2px solid #ddd"
    },
    buttos: {
        container: {
            margin: "0 0 16px 0"
        },
        content: {
            justifyContent: "space-around"
        }
    },
    buttonsGroup: {
        container: {
            height: "40px",
            margin: "4px 0 4px 0"
        }
    },
    store: {
        container: {
            width: "300px",
            margin: "8px 0 8px 0"
        }
    }
}
