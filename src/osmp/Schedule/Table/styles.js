import {templates} from 'styles';

const cell = {
    margin: "0 0 -1px -1px",
    border: "1px solid " + templates.colors.frame,
    ...templates.fonts.small,
    color: templates.colors.border,
    textAlign: "center",
    boxSizing: "border-box"
};

export default {

    container: {
        display: "grid",
        gridTemplateColumns: ""
    },

    header: {
        corner: {
            position: "sticky",
            left: "16px",
            top: "0",
            backgroundColor: templates.colors.panel,
            zIndex: "2",
            ...cell,
            cursor: "pointer",
            color: templates.colors.text
        },
        date: {
            position: "sticky",
            top: "0",
            backgroundColor: templates.colors.panel,
            ...cell,
            cursor: "pointer",
            color: templates.colors.text
        },
        box: {
            width: "100%",
            height: "100%",
            padding: "4px",
            boxSizing: "border-box"
        },
        current: {
            border: '1px solid red'
        },
        sunday: {
            backgroundColor: "#ffd9a5"
        },
        saturday: {
            backgroundColor: "#ff9f93"
        },
        sort: {
            fontWeight: "bold"
        }
    },

    row: {
        fio: {
            position: "sticky",
            left: "16px",
            padding: "4px",
            backgroundColor: "#eee",
            ...cell,
            color: templates.colors.text
        },
        cell: {
            ...cell
        },
        doctor: {
            backgroundColor: templates.colors.doctor
        },

        assistant: {
            backgroundColor: templates.colors.assistant
        },

        absent: {
            backgroundColor: templates.colors.absent
        }
    }

}
