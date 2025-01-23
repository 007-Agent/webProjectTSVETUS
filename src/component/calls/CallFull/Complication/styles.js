import {templates} from 'styles';

export default {

    group: {

        container: {
        },

        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            flex: "1",
            padding: "8px"
        }

    },

    component: {
        container: {
            margin: "8px 8px 16px 8px",
            border: "none",
            borderBottom: "1px dotted #ddd"
        },
        edit: {
            textAlign: "right",
            ...templates.fonts.common
        },
        label: {
            ...templates.fonts.common
        },
        item: {
            ...templates.fonts.common
        }
    }

}
