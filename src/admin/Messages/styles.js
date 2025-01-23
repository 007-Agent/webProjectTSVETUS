import {templates} from 'styles';

export default {

    container: {

    },

    panel: {
        container: {
            ...templates.fonts.small,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center"
        }
    },

    content: {
        display: "flex",
        padding: "0 16px 0 16px"
    },

    left: {
        margin: "0 8px 0 0",
        flex: "1 1 100%"
    },

    right: {
        margin: "0 0 0 8px",
        flex: "1 1 400px"
    },

    scroll: {
        container: {
            margin: "8px 0 0 0"
        },
        content: {
            padding: "0"
        }
    },

    table: {
        container: {
            ...templates.fonts.small
        },
        caption: {
            ...templates.fonts.xSmall
        },
        cell: {
            textAlign: "center"
        }
    },

    detail: {
        container: {
            ...templates.fonts.xSmall
        },
        cell: {
            textAlign: "center"
        }
    },

    date: {
        container: {
            margin: "8px",
            width: "200px"
        }
    },

    component: {
        container: {
            width: "350px",
            margin: "8px"
        }
    },

    icon: {
    	container: {
        	width: "18px",
        	height: "18px"
    	}
    },

    row:{
        height: "32px"
    },

    deleteIcons: {
        container:{
            height: "24px"
        }
    }

}
