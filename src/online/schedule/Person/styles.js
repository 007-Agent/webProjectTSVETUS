import {templates} from 'styles';

export default {

    form: {
        container: {
            minWidth: "320px"
        }
    },

    item: {

        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        },

        box: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center"
        },

        person: {
            ...templates.fonts.small
        },

        department: {
            margin: "4px 0 0 0",
            ...templates.fonts.tiny,
            color: templates.colors.metaCaption
        },

        branch: {
            margin: "4px 0 0 4px",
            ...templates.fonts.tiny,
            color: templates.colors.metaText
        }

    }

}