import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        ...templates.fonts.common
    },

    table: {

    },

    text: {

    },

    row: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%"
    },

    icon: {
        container: {
            cursor: "pointer",
            width: "22px",
            height: "22px",
            margin: "0 0 0 16px"
        }
    }

}
