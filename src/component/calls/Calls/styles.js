import {templates} from 'styles';

const RECEIVED = "#e25";
const DRIVING = "#ee2";
const ARRIVED = "#87f";
const COMPLETED = "#26f";
const RETURNED = "#1a3";
const CANCELLED = "#ddd";

export default {

    container: {
    },

    panel: {
        container: {
            display: "flex",
            flexDirection: "column"
        }
    },

    params:{
        container: {
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            width: "100%"
        },
        check: {
            container: {
                margin: "0 0 0 16px",
                width: "200px",
                borderBottom: "none"
            }
        },
        date: {
            container: {
                margin: "0 0 0 16px",
                width: "200px",
                borderBottom: "none"
            }
        }
    },

    ychGroups: {
        content: {
            margin: "16px 0 0 0",
            border: "none",
            padding: "0"
        },
        control: {
            container: {
                margin: "4px"
            }
        }
    },

    pager: {
        container: {
            margin: "16px 0 0 0"
        }
    },


    scroll: {

    },

    received: {
        borderWidth: "4px",
        borderColor: RECEIVED
    },

    driving: {
        border: "4px",
        borderColor: DRIVING
    },

    arrived: {
        border: "4px",
        borderColor: ARRIVED
    },

    completed: {
        border: "4px",
        borderColor: COMPLETED
    },

    returned: {
        border: "4px",
        borderColor: RETURNED
    },

    cancelled: {
        border: "4px",
        borderColor: CANCELLED
    },

    ribbon: {
        container: {
            width: "100%"
        },
        content: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
        },
        frame: {
            display: "flex",
            flexDirection: "column",
            width: "520px",
            margin: "8px",
            borderRadius: "16px",
            border: "1px solid red",
            padding: "8px"
        }
    },

    icon: {
        common: {
            color: templates.colors.border,
            margin: "0 0 0 16px"
        },
        wait: {
            color: templates.colors.error
        },
        fail: {
            color: templates.colors.error
        }
    }

}
