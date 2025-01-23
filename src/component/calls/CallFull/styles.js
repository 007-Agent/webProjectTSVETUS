import {templates} from 'styles';

export default {

    wrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },

    container: {
        width: "100%",
        maxWidth: "900px",
        border: "2px dotted #ddd",
        padding: "16px",
        margin: "8px",
        borderRadius: "16px",
        justifySelf: "center",
        alignSelf: "center"
    },

    box: {
        display: "flex",
        flexWrap: "wrap"
    },

    loading: {
        ...templates.fonts.large,
        padding: "32px",
        width: "100%",
        color: "#f43",
        textAlign: "center"
    },

    data: {

        group: {
            container: {
                margin: "16px 0 0 0",
                width: "100%"
            },
            content: {
                padding: "16px",
                borderRadius: "8px"
            },
            label: {
                color: "#039",
                fontWeight: "bold",
                ...templates.fonts.small
            }
        },

        component: {

            container: {
                margin: "16px 0 16px 0",
                border: "none",
                borderBottom: templates.borders.light
            },

            edit: {
                textAlign: "right",
                border: "none",
                ...templates.fonts.common,
                whiteSpace: "normal",
                overflowWrap: "break-word",
                minHeight: "32px"
            },

            label: {
                ...templates.fonts.common,
                maxWidth: "300px"
            },

            item: {
                ...templates.fonts.common
            }

        },

        memo: {
            container: {
                margin: "8px 0 8px 0",
                width: "100%"
            },
            edit: {
                ...templates.fonts.common,
                border: templates.borders.light,
                minHeight: "38px"
            },
            label: {
                ...templates.fonts.common
            }
        },

        list: {

            group: {
                container: {
                    margin: "8px 0 8px 0",
                    padding: "0",
                    width: "100%"
                },
                label: {
                    ...templates.fonts.common
                },
                content: {
                    borderColor: templates.colors.frame
                }
            },

            item: {
                ...templates.fonts.common,
                textAlign: "right"
            },

            ref: {
                container: {
                    backgroundImage: "linear-gradient(to right, " +
                        templates.colors.shadow + ", " + templates.colors.window + ")",
                    backgroundColor: templates.colors.shadow,
                    borderBottom: "none"
                }
            }

        },

        text: {
            ...templates.fonts.common,
            margin: "24px 0 0 0",
            fontStyle: "italic",
            color: templates.colors.metaText
        },

        time: {
            container: {
                margin: "16px 0 16px 0"
            }
        },

        date: {
            container: {
                margin: "16px 0 16px 0"
            }
        }

    }

}
