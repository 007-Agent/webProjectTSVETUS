import {templates} from 'styles';
export default {
    container: {
        display: "flex"
    },
    left:{
        display: "flex",
        //border: "1px solid red",
        width: "60%",
        flexDirection: "column"
    },
    document: {
        display: "flex",
        //border: "1px solid green",
        flexDirection: "row",
        width: "100%"
    },
    right: {
        display: "flex",
        //border: "1px solid blue",
        width: "40%",
        flexDirection: "column",
        alignItems: "center"
    },
    fields: {
        container: {
            width: "100%",
            margin: "4px 4px 4px 4px"
        }
    },
    date: {
        container: {
            margin: "8px",
            width: "300px",
            height: "40px",
            borderBottom: "none"
        }
    },
    number: {
        container: {
            margin: "8px",
            height: "40px",
        }
    },
    ref: {
        container: {
            width: "300px",
            margin: "0 16px 0 16px",
            //border: templates.borders.light
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.medium,
            minHeight: "40px"
        }
    }
};
