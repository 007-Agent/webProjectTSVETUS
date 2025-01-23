import {templates} from 'styles';

export default {

    line: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },

    crew: {
        container: {
            flex: "1 1 100%",
            marginRight: "16px"
        }
    },

    time: {
        container: {
            width: "240px"
        },
        edit: {
            textAlign: "center",
            ...templates.fonts.large
        }
    }

}
