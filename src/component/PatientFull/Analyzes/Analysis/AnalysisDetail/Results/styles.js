import {templates} from 'styles';

const BORDER = templates.borders.light;

const HEAD = {
    textAlign: "center",
    border: BORDER,
    ...templates.fonts.small
};

const DETAIL = {

    microbio: {

        pathogen: {
            margin: "16px 0 0 16px",
            textAlign: "left",
            fontStyle: "normal",
            ...templates.fonts.small
        },

        antibiotics: {
            margin: "8px 0 8px 32px",
            textAlign: "left",
            ...templates.fonts.small,
            fontStyle: "italic"
        },

        line: {
            display: "flex"
        },

        caption: {
            margin: "0",
            fontStyle: "normal",
            fontWeight: "bold"
        },

        value: {
            margin: "0 0 0 8px",
            fontStyle: "italic"
        }

    },

    allergy: {

        header: {
            margin: "8px 0 0 16px",
            textAlign: "left",
            fontStyle: "normal",
            ...templates.fonts.small
        },

        line: {
            margin: "8px 0 8px 0",
            display: "flex"
        },

        caption: {
            margin: "0",
            fontStyle: "normal",
            fontWeight: "normal"
        },

        value: {
            margin: "0 0 0 8px",
            fontStyle: "italic"
        },

        results: {
            margin: "8px 0 8px 32px",
            textAlign: "left",
            ...templates.fonts.small,
            fontStyle: "italic"
        }

    }

};

export default {

    table: {

        container:{
            margin: "8px 0 0 0"
        },

        table: {
            borderCollapse: "collapse",
            width: "100%"
        },

        head: {
            number: HEAD,
            name: HEAD,
            units: HEAD,
            result: HEAD,
            norma: HEAD,
            deviation: HEAD,
            date: HEAD
        },

        body: {

            cell: {
                fontStyle: "italic",
                textAlign: "center",
                border: BORDER,
                ...templates.fonts.small
            },

            alert: {
                fontStyle: "italic",
                textAlign: "center",
                border: BORDER,
                color: "#FF0000",
                ...templates.fonts.small
            },

            one:{
                width:"20px"
            },

            two:{
                width:"180px"
            },

            three:{
                width:"80px",
                ...templates.fonts.xSmall
            },

            four:{
                width:"100px"
            },

            five:{
                width:"250px"
            },

            six:{
                width:"80px"
            },

            seven:{
                width:"90px"
            }

        },

        detail: DETAIL

    },

    text: {

        container: {
            margin: "8px 0 0 0",
            padding: "4px",
            border: "1px solid " + templates.colors.frame,
            borderRadius: "4px"
        },

        line: {
            margin: "8px 8px 0 8px",
            display: "flex",
            ...templates.fonts.small,
            textAlign: "left"
        },

        alert: {
            color: "#FF0000"
        },

        caption: {
            margin: "0",
            fontStyle: "normal",
            fontWeight: "normal"
        },

        value: {
            margin: "0 0 0 8px",
            fontStyle: "italic"
        },

        detail: DETAIL

    }

}
