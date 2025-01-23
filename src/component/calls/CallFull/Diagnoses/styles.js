import {templates} from 'styles';

export default {

    group: {

    },

    component: {

        label: {
            maxWidth: "320px"
        }

    },

    diagnosis: {

        container: {
            margin: "8px 0 8px 0"
        },

        search: {
            container: {
            },
            edit: {
                flex: "0 0 200px",
                ...templates.fonts.common,
                border: templates.borders.light,
                minHeight: "38px"
            },
            label: {
                ...templates.fonts.common,
                textAlign: "left"
            },
            item: {
                ...templates.fonts.common
            }
        },

        memo: {
            container: {
                margin: "8px 0 0 0",
                width: "100%"
            },
            edit: {
                ...templates.fonts.common,
                border: templates.borders.light
            },
            label: {
                ...templates.fonts.small
            }
        }

    }

}
