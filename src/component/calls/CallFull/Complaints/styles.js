import {templates} from 'styles';

export default {

    container: {
        padding: "8px",
        border: "1px solid rgba(108, 167, 176, 0.5)",
        borderRadius: "8px 22px 22px 8px",
    },

    group: {
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            flex: "1"
        }
    },

    box: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "16px 0px"
    },

    bottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "16px"
    },

    iconDelete: {
        color: "#d22",
        flexShrink: "0"
    },

    complaint: {
        container: {
            width: "100%",
            border: templates.borders.lightDash,
            borderRadius: "16px",
            padding: "4px 8px 4px 8px",
            cursor: "pointer"
        },
        edit: {
            ...templates.fonts.common
        },
        label: {
            ...templates.fonts.common
        },
        item: {
            ...templates.fonts.common
        }
    },

    text: {
        ...templates.fonts.common
    },

    test: {
        container:{
            width:"100%",
            border:"none",
            cursor:"pointer",
            backgroundImage:"linear-gradient(to right, rgba(52,121,130,0.15), #ffffff)",
            backgroundColor:"rgba(52,121,130,0.15)",
            borderRadius:"4px 16px 16px 4px"
        },
        edit:{
            border:"none"
        },
        label:{
            cursor:"pointer",
            fontFamily:"Arial",
            fontSize:"24px"
        },
        item:{
            fontFamily:"Arial",
            fontSize:"24px"
        },
        icon:{
            flexShrink:"0",
            width:"32px",
            height:"32px",
            cursor:"pointer",
            color:"green"
        },
        frame:{}
    }
}
