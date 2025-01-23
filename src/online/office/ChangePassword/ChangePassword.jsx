import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

import {
    TPanel,
    TInput,
    TButton,
    TResponse,
    merge,
    post,
    params
} from 'tinput';

import styles from './styles.js';

class ChangePassword extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            password: null,
            confirm: null,
            wait: false,
            error: null,
            message: null
        };
        this.validate = this.validate.bind(this);
        this.change = this.change.bind(this);
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    validate(event){
        if (event.name === 'confirm') {
            return event.value && event.value === this.state.password;
        } else if (event.name === 'password') {
            return event.value && event.value.length > 7;
        } else {
            return true;
        }
    }

    change(event){
        this.setState({
            [event.name]: event.value
        });
    }

    click(){
        let par = params(window.location.href);
        post({
            url: '/api/login/link/change/password',
            data: {
                user: par.user,
                mail: par.mail,
                password: this.state.password
            },
            sender: this
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <Header
                    style={style.header}
                    name={'header'}
                    user={null}
                    onClick={null} />

                <TPanel />

                <div style={style.content}>

                    <TInput
                        layout={'top'}
                        style={style.password}
                        type={'password'}
                        value={this.state.password}
                        label={'Новый пароль:'}
                        name={'password'}
                        onValidate={this.validate}
                        onChange={this.change}/>

                    <TInput
                        layout={'top'}
                        style={style.password}
                        type={'password'}
                        value={this.state.confirm}
                        label={'Повторите пароль:'}
                        name={'confirm'}
                        onValidate={this.validate}
                        onChange={this.change}/>

                    <TResponse
                        wait={this.state.wait}
                        error={this.state.error}
                        message={this.state.message} />

                    <TButton
                        style={style.button}
                        name={'submit'}
                        onClick={this.click}>
                        Подтвердить
                    </TButton>

                    <a
                        style={style.back}
                        href={'/office'}>
                        На главную страницу
                    </a>

                </div>

            </div>

        );

    }

}

ChangePassword.propTypes = {
    style: PropTypes.object
};

export default ChangePassword;
