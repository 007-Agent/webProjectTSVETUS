import React from 'react';
import PropTypes from 'prop-types';

import {
    TText,
    TButton,
    TResponse,
    merge,
    post, TForm
} from 'tinput';

import styles from  './styles.js';

class Remove extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wait: false,
            error: null,
            message: null
        };
        this.handleClose = this.handleClose.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleClose(event) {
        if (event.button === 'yes') {
            this.remove(event);
        } else {
            this.close(event);
        }
    }

    close(event) {
        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    remove(event) {
        post({
            url: '/api/office/patient/rem',
            data: {patientId: this.props.patient.id},
            sender: this,
            default: () => {
                this.close(event);
            }
        });
    }

    render() {

        let style = merge(styles, this.props.style);

        return (

            <TForm
                style={style.form}
                name={this.props.name}
                wait={this.state.wait}
                show={this.props.patient}
                buttons={{
                    yes: "Да",
                    no: "Нет"
                }}
                caption={'Удаление'}
                onClose={this.handleClose}>
                <div style={style.text}>
                    Вы действительно хотите удалить пациента?
                </div>
            </TForm>

        );

    }

}

Remove.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    patient: PropTypes.object,
    onClose: PropTypes.func
};

export default Remove;
