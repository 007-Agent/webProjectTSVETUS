import React from 'react';
import PropTypes from 'prop-types';

import {
    TText,
    TButton,
    TResponse,
    merge,
    post
} from 'tinput';

import styles from  './styles.js';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nib: null,
            pin: null,
            wait: false,
            error: null,
            message: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(event) {
        this.setState({[event.name]: event.value});
    }

    handleClose() {
        this.setState({error: null, message: null});
    }

    add() {
        post({
            url: '/api/office/patient/add',
            data: {pin: this.state.pin, nib: this.state.nib},
            sender: this,
            success: () => {
                if (this.props.onAdd) {
                    this.props.onAdd();
                    this.setState({
                        nib: null,
                        pin: null
                    });
                }
            }
        });
    }

    render() {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <div style={style.text}>
                    {'Для добавления пациента введите номер медицинской карты, пин-код и нажмите кнопку "Добавить"'}
                </div>

                <TResponse
                    wait={this.state.wait}
                    error={this.state.error}
                    message={this.state.message}
                    onClose={this.handleClose}>

                    <div style={style.box}>

                        <TText
                            style={style.nib}
                            name={'nib'}
                            layout={'top'}
                            placeholder={'№ И.Б.'}
                            value={this.state.nib}
                            onChange={this.handleChange}
                            onValidate={e => {
                                return e.value && e.value.length >= 4
                            }} />

                        <TText
                            style={style.pin}
                            name={'pin'}
                            layout={'top'}
                            placeholder={'Пин-код'}
                            value={this.state.pin}
                            onChange={this.handleChange}
                            onValidate={e => {
                                return e.value && e.value.length === 12
                            }} />

                        <TButton
                            style={style.button}
                            wait={this.state.wait}
                            onClick={this.add}>
                            {'Добавить'}
                        </TButton>

                    </div>

                </TResponse>

            </div>

        );

    }

}

Edit.propTypes = {
    style: PropTypes.object,
    onAdd: PropTypes.func
};

export default Edit;
