import React from 'react';
import PropTypes from 'prop-types';

import {
    TMail,
    TInput,
    TText,
    TButton,
    TResponse,
    merge,
    clone,
    post
} from 'tinput';

import Captcha from 'component/Captcha';

import styles from './styles.js';

class Recover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            captcha: null,
            error: props.error,
            message: props.message
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setError = this.setError.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.recover = this.recover.bind(this);
    }

    componentDidUpdate(old) {
        if (old.error !== this.props.error) {
            this.setError(this.props.error);
        }
        if (old.message !== this.props.message) {
            this.setMessage(this.props.message);
        }
    }

    recover() {
        post({
            url: '/api/login/recover',
            data: {email: this.state.email, captcha: this.state.captcha},
            sender: this
        });
    }

    setError(error) {
        this.setState({error: error});
    }

    setMessage(message) {
        this.setState({message: message});
    }

    handleChange(event) {
        this.setState({
            ...clone(this.state),
            [event.name]: event.value
        });
    }

    handleOk() {
        if (this.state.message) {
            if (this.props.onRecover) {
                this.props.onRecover();
            }
        } else {
            this.setState({
                captcha: null,
                error: null,
                message: null
            });
        }
    }

    handleSubmit() {
        if (!this.state.email || this.state.email === '') {
            this.setError('Не задан e-mail!');
        } else if (!this.state.captcha !== this.state.captcha === '') {
            this.setError('Не задан код!');
        } else {
            this.recover();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TResponse
                style={style.container}
                message={this.state.message}
                error={this.state.error}
                wait={this.state.wait}
                onClose={this.handleOk}>

                <div style={style.text}>
                    Восстановление пароля
                </div>

                <TMail
                    style={style.input}
                    name={'email'}
                    placeholder={'E-mail'}
                    value={this.state.email}
                    layout={'top'}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleChange} />

                <Captcha
                    style={style.captcha} />

                <TText
                    style={style.input}
                    name={'captcha'}
                    placeholder={'Введите код'}
                    value={this.state.captcha}
                    layout={'top'}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleChange}
                    onValidate={(e) => {
                        return e.value && e.value.length >= 5;
                    }} />

                <TButton
                    style={style.button}
                    name={'submit'}
                    onClick={this.handleSubmit} >
                    {'Восстановить пароль'}
                </TButton>

            </TResponse>

        );


    }

}

Recover.propTypes = {
    style: PropTypes.object,
    onRecover: PropTypes.func
};

export default Recover;