import {templates} from 'styles';

const cell = {
    ...templates.cells.light,
    color: templates.colors.border
};

export default {

    container: {
    },

    panel: {
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    },

    component: {
        container: {
            margin: "8px",
            maxWidth: "380px"
        }
    },

    date: {
        container: {
            margin: "8px",
            maxWidth: "220px"
        }
    },

    wait: {
        color: "#f00"
    },

    button: {
        display: "flex",
        height: "10px",
        margin: "16px 16px 0 0"
    },

    download:{
        ...templates.fonts.tiny
    },

    caption: {
        display: "flex",
        alignItems: "flex-end"
    },

    group: {
        container: {
            padding: "0",
            minWidth: "200px",
            margin: "0 0 0 8px"
        },
        content: {
            border: "none",
            padding: "0"
        },
        control: {
            container: {
                width: "110px",
                margin: "0 0 0 8px",
                borderBottom: "none"
            }
        }
    },

    table:{

        container: {
            width: "100%",
            borderCollapse: "collapse",
            ...templates.fonts.small,
        },

        head:{
            position: "sticky",
            top: "0",
            left: "0"
        },

        cell:{
            date:{
                ...cell,
                width: "5.5%"
            },
            brig:{
                ...cell,
                width: "7%"
            },
            card:{
                ...cell,
                width: "5%"
            },
            nib:{
                ...cell,
                width: "5.5%"
            },
            fio:{
                ...cell,
                width: "17%"
            },
            time:{
                ...cell,
                width: "6%"
            },
            timeSmall:{
                ...templates.fonts.tiny,
                ...cell,
                width: "6.5%"
            }
        }

    }

}
