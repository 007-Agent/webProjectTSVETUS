import {templates} from "styles";

export default {

    container: {
        display: "flex",
        flexWrap: "wrap",
        margin: "16px 0 16px 0",
        opacity: "1",
        fontSize: "14px"
    },
    diag: {
        color: templates.colors.border,
        ...templates.fonts.common,
    },
    col:{
        display: "flex",
        flexDirection: "column",
        margin: "16px 4px 16px 4px",
        minWidth: "50px",
        maxWidth: "250px",
        borderRight: templates.borders.light
    },
    item:{
        display: "flex",
        margin: "0px 4px 8px 4px"
    },
    list: {
        container: {width: "100%"},
        content: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
        },
        frame: {
            width: "200px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid #aaa",
            margin: "8px",
            padding: "16px",
            border: templates.borders.light,
            borderRadius: "16px"
        },
        field: {
            color: templates.colors.border,
            float: "left",
            marginRight: "2px",
        },
        value: {
            fontStyle: "italic"
        },
        col: {width: "100%", textAlign: "left"}
    }

}
