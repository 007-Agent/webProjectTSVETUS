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

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: null,
                firstName: null,
                captcha: null
            },
            password: null,
            confirm: null,
            error: props.error,
            message: props.message
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setError = this.setError.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    componentDidUpdate(old) {
        if (old.error !== this.props.error) {
            this.setError(this.props.error);
        }
        if (old.message !== this.props.message) {
            this.setMessage(this.props.message);
        }
    }

    signUp() {
        post({
            url: '/api/login/create',
            data: {user: this.state.user, password: this.state.password},
            sender: this
        });
    }

    setError(error) {
        this.setState({error: error});
    }

    setMessage(message) {
        this.setState({message: message});
    }

    handleUserChange(event) {
        let user = clone(this.state.user);
        user[event.name] = event.value;
        this.setState({user: user});
    }

    handlePasswordChange(event) {
        this.setState({
            ...clone(this.state),
            [event.name]: event.value
        });
    }

    handleOk() {
        if (this.state.message) {
            if (this.props.onSignUp) {
                this.props.onSignUp();
            }
        } else {
            let user = {
                ...clone(this.state.user),
                captcha: null
            };
            this.setState({
                error: null,
                message: null,
                user: user
            });
        }
    }

    handleSubmit() {
        if (!this.state.password || this.state.password === '') {
            this.setError('Не задан пароль!');
        } else if (this.state.password !== this.state.confirm) {
            this.setError('Пароли не совпадают!');
        } else {
            this.signUp();
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
                wait={this.state.wait}
                message={this.state.message}
                error={this.state.error}
                onClose={this.handleOk}>

                <TMail
                    style={style.input}
                    name={'email'}
                    placeholder={'E-mail'}
                    value={this.state.user.email}
                    layout={'top'}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleUserChange} />

                <TText
                    style={style.input}
                    name={'firstName'}
                    placeholder={'Имя'}
                    value={this.state.user.firstName}
                    layout={'top'}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleUserChange}
                    onValidate={(e) => {
                        return e.value && e.value.length >= 3;
                    }} />

                <TInput
                    style={style.input}
                    name={'password'}
                    placeholder={'Пароль'}
                    value={this.state.password}
                    type={'password'}
                    layout={'top'}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handlePasswordChange}
                    onValidate={e => {
                        return e.value && e.value.length >= 8;
                    }} />

                <TInput
                    style={style.input}
                    name={'confirm'}
                    placeholder={'Подтвердите пароль'}
                    value={this.state.confirm}
                    type={'password'}
                    layout={'top'}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handlePasswordChange}
                    onValidate={e => {
                        return e.value && e.value.length >= 8;
                    }} />

                <Captcha
                    style={style.captcha} />

                <TText
                    style={style.input}
                    name={'captcha'}
                    placeholder={'Введите код'}
                    value={this.state.user.captcha}
                    layout={'top'}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleUserChange}
                    onValidate={(e) => {
                        return e.value && e.value.length >= 5;
                    }} />

                <TButton
                    style={style.button}
                    name={'submit'}
                    onClick={this.handleSubmit} >
                    {'Зарегистрироваться'}
                </TButton>

            </TResponse>

        );


    }

}

SignUp.propTypes = {
    style: PropTypes.object,
    onSignUp: PropTypes.func
};

export default SignUp;