import React from 'react';
import PropTypes from 'prop-types';

import {TForm, TInput, merge, clone, post} from 'tinput';

import styles from './styles.js';

class Password extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            wait: false,
            error: null,
            message: null,
            user: props.user,
            confirm: null
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.before = this.before.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    before() {
        if (this.mounted) {
            this.setState({
                wait: false,
                error: null,
                message: null
            });
        }
    }

    success(message) {
        if (this.mounted) {
            if (this.props.onClose) (
                this.props.onClose({name: 'password', message: message})
            );
        }
    }

    fail(error) {
        if (this.mounted) {
            this.setState({error: error});
        }
    }

    save() {
        if (this.mounted) {
            this.before();
            post({
                url: '/api/user/update/password',
                data: {user: this.state.user},
                success: (response, message) => {
                    this.success(message);
                },
                fail: (status, error) => {
                    this.fail(error.message);
                }
            });
        }
    }

    handleClose(event) {
        if (event.button === 'save') {
            if (this.state.confirm && this.state.confirm === this.state.user.password) {
                this.save();
            } else {
                this.setState({error: 'Пароли не совпадают!'});
            }
        } else if (event.button === 'ok') {
            this.setState({error: null});
        }  else if (event.button === 'cancel') {
            if (this.props.onClose) {
                this.props.onClose({name: 'password'})
            }
        }  else if (event.button === 'close') {
            if (this.props.onClose) {
                this.props.onClose({name: 'password'})
            }
        }
    }

    handleChange(event) {
        if (event.name === 'confirm') {
            this.setState({confirm: event.value});
        } else  {
            let user = {
                ...clone(this.state.user),
                password: event.value
            };
            this.setState({user: user});
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TForm
                style={style}
                buttons={{cancel: 'Отмена', save: 'Сохранить'}}
                show={true}
                wait={this.state.wait}
                error={this.state.error}
                onClose={this.handleClose}>

                <div style={style.content}>

                    <TInput
                        style={style.input}
                        name={'password'}
                        type={'password'}
                        label={'Пароль:'}
                        layout={'top'}
                        value={this.state.user.password}
                        onChange={this.handleChange} />

                    <TInput
                        style={style.input}
                        name={'confirm'}
                        type={'password'}
                        label={'Повторить пароль:'}
                        layout={'top'}
                        value={this.state.confirm}
                        onChange={this.handleChange} />

                </div>

            </TForm>

        );

    }

}

Password.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Password;
