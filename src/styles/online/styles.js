import colors from './colors.js';
import fonts from './fonts.js';

export default {

    TTop: {
        container: {
            padding: "16px 16px 0 16px"
        }
    },

    TSide: {
        item: {
            color: colors.border,
            padding: "8px 8px 8px 8px"
        }
    },

    TPanel: {
        container: {
            padding: "16px 16px 0 16px"
        }
    },

    TScroll: {
        content: {
            padding: "16px 16px 0 16px"
        }
    },

    TComponent: {
        container: {
            border: "none"
        },
        edit: {
            border: '1px solid ' + colors.frame,
            borderRadius: "4px",
            minHeight: "32px"
        },
        label: {
            ...fonts.small
        },
        list: {
            first: {
                borderRadius: "4px 4px 0 0"
            },
            last: {
                borderRadius: "0 0 4px 4px"
            }
        },
        invalid: {
            container: {
                border: "none"
            },
            edit: {
                border: '1px solid ' + colors.invalid,
                backgroundColor: colors.window,
                borderRadius: "4px"
            }
        }
    },

    TDate: {
        container: {
            border: "none"
        },
        edit: {
            border: '1px solid ' + colors.frame,
            borderRadius: "4px"
        },
        label: {
            ...fonts.small
        },
        invalid: {
            container: {
                border: "none"
            },
            edit: {
                border: '1px solid ' + colors.invalid,
                backgroundColor: colors.window,
                borderRadius: "4px"
            }
        }
    },

    TCalendar: {
        container: {
            border: "1px solid " + colors.border,
            padding: "8px",
            minWidth: "320px",
            borderRadius: "4px"
        }
    },

    TModal: {

        container: {
            padding: "4px",
            borderRadius: "4px"
        },

        header: {
            margin: "8px 4px 8px 4px",
            ...fonts.common
        },

        caption: {
            margin: "0"
        },

        content: {
            padding: "2px",
            margin: "0"
        },

        footer: {
            margin: "0",
            padding: "4px 0 0 0"
        }

    },

    TMemo: {
        edit: {
            minHeight: "32px"
        }
    }

}
