import colors from './colors.js';
import fonts from './fonts.js';

export default {

    TPanel: {
        container: {
            padding: "16px"
        }
    },

    TTop: {
        container: {
            padding: "16px 16px 0 16px"
        },
        caption: {
        },
        icon: {
            container: {
                margin: "0 0 0 16px"
            }
        }
    },

    TScroll: {
        content: {
            padding: "0 16px 0 16px"
        }
    },

    TDate: {
        container: {
            width: "300px",
            borderBottom: "1px solid " + colors.border
        },
        edit: {
            border: "none",
            textAlign: "center"
        },
        icon: {
            container: {
            }
        },
        invalid: {
            edit: {
                border: "none"
            }
        },
        calendar: {
            container: {
                minWidth: "312px"
            }
        }
    },

    TTime: {
        container: {
            width: "220px",
            borderBottom: "1px solid " + colors.border
        },
        edit: {
            border: "none",
            textAlign: "center"
        },
        invalid: {
            edit: {
                border: "none"
            }
        },
        icon: {
            color: "#0a3",
            width: "28",
            height: "28",
            flexShrink: "0"
        }
    },

    TTable: {
        caption: {
            padding: "12px 4px 12px 4px"
        }
    },

    TPager: {
        page: {
            borderRadius: "8px",
            height: "32px",
            width: "32px"
        }
    },

    TComponent: {
        container: {
        },
        edit: {
            minHeight: "36px"
        },
        invalid: {
            edit: {
                border: "none"
            }
        },
        list: {
            item: {
                display: "flex",
                minHeight: "32px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.shadow,
                ...fonts.common
            },
            first: {
                borderRadius: "8px 8px 0 0"
            },
            last: {
                borderRadius: "0 0 8px 8px"
            }
        }
    },

    TMemo: {
        container: {
            borderBottom: "none"
        },
        edit: {
            borderColor: colors.frame,
            minHeight: "38px"
        }
    },

    TButton: {
        container: {
        }
    },

    TLogin: {
        component: {
            container: {
                margin: "16px 0 0 0",
                border: "none",
                borderBottom: "none",
            },
            edit: {
                borderBottom: "none",
                border: "1px solid " + colors.frame,
                borderRadius: "4px"
            },
            label: {
                ...fonts.small
            }
        }
    },

    TCheck: {
    },

    TPopup: {
        container: {
            borderBottom: "none"
        }
    },

    TListBox: {
    },

    TCalendar: {
        container: {
            padding: "8px",
            border: "1px solid " + colors.border,
            minWidth: "297px"
        }
    }

}
