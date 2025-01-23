import {templates} from 'styles';

export default {

    item: {

        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        },

        department: {
            ...templates.fonts.small
        },

        branch: {
            margin: "4px 0 0 0",
            ...templates.fonts.xSmall,
            color: templates.colors.metaText
        }

    }

}