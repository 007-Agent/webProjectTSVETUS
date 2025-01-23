const RECEIVED = "#e25";
const DRIVING = "#ee2";
const ARRIVED = "#87f";
const COMPLETED = "#26f";
const RETURNED = "#1a3";
const CANCELLED = "#ddd";

const WIDTH = '320px';

export default {

    container: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexWrap: "wrap"
    },

    check: {
        container: {
            margin: "0 0 0 16px",
            border: "none"
        }
    },

    item: {
        margin: "4px",
        borderRadius: "8px",
        padding: "8px"
    },

    received: {
        border: "4px solid " + RECEIVED,
        maxWidth: WIDTH
    },

    driving: {
        border: "4px solid " + DRIVING,
        maxWidth: WIDTH
    },

    arrived: {
        border: "4px solid " + ARRIVED,
        maxWidth: WIDTH
    },

    completed: {
        border: "4px solid " + COMPLETED,
        maxWidth: WIDTH
    },

    returned: {
        border: "4px solid " + RETURNED,
        maxWidth: WIDTH
    },

    cancelled: {
        border: "4px solid " + CANCELLED,
        maxWidth: WIDTH
    }

}
