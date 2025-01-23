import {templates} from 'styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
//        alignItems: "center",
        width: "280px",
        ...templates.fonts.common,
        margin: "8px",
        border: "2px solid",
        borderRadius: "8px",
        padding: "8px",
        borderColor: templates.colors.border,
        cursor: "pointer"
    },

    head: {

        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        },

        nib: {
            width: "120px",
            textAlign: "left",
            ...templates.fonts.common
        },

        ych: {
            office: {
                width: "90px",
                textAlign: "center",
                ...templates.fonts.common,
            },
            rest: {
                width: "120px",
                textAlign: "center",
                ...templates.fonts.common,
            }
        },
        button: {
            width: "30px",
            textAlign: "right",
            ...templates.fonts.common
        }

    },

    fio: {
        //display: "flex",
        margin: "8px 0 0 0",
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        ...templates.fonts.common
    },

    age: {
        //display: "flex",
        margin: "8px 0 0 0",
        width: "100%",
        textAlign: "center",
        ...templates.fonts.small
    }

}
