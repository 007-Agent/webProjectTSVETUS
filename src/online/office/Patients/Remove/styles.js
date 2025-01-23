import {templates} from 'styles';

export default {

    form: {
        container: {
            width: "400px",
            margin: "auto",
            paddingTop:"24px",
            textAlign: "center",
            zIndex: "100",
            border: "2px solid " + templates.colors.frame,
            borderRadius: "16px",
            backgroundColor: "white",
        },
        content: {
            padding: "16px"
        },
        buttons: {
            message: {color: "#1e4c0f"},
            continue: {color: "#131868"}
        }
    },

    text: {
        flex: "1 1 100%",
        padding: "8px",
        border: "2px solid #ddd"
    }

}