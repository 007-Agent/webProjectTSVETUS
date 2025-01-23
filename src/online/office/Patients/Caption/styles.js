import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },

    box: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around"
    },

    nib: {
        margin: "4px"
    },

    name: {
        margin: "4px",
        fontWeight: "bold"
    },

    age: {
        margin: "4px",
        ...templates.fonts.small
    },

    icon: {
        margin: "4px",
        cursor: "pointer"
    }

}