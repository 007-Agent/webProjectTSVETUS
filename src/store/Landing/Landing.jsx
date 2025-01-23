import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    TText,
    TButton,
    TResponse,
    merge,
    clone,
    post
} from 'tinput';

import Password from './Password';

import styles from './styles.js';

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user ? props.user : {};
        this.state = {
            user: clone(this.user),
            password: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.before = this.before.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changed = this.changed.bind(this);
        this.updateCaption = this.updateCaption.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.props.onTools([]);
        this.updateCaption();
    }

    componentDidUpdate(old) {
        if (old.user !== this.props.user) {
            this.user = this.props.user ? this.props.user : {};
            this.setState({user: clone(this.user)}, () => {
                this.updateCaption();
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateCaption() {
        let user = this.props.user;
        let caption = 'Пользователь';
        if (user && user.resource) {
            caption = user.resource.username;
        }
        this.props.onCaption(caption);
    }

    handleChange(event) {
        let user = {
            ...clone(this.state.user),
            [event.name]: event.value
        };
        this.setState({user: user});
    }

    handleClick(event) {
        if (event.name === 'cancel') {
            this.cancel();
        } else if (event.name === 'save') {
            this.save();
        } else if (event.name === 'password') {
            this.setState({
                password: true,
                message: event.message
            });
        }
    }

    handlePassword(event) {
        this.setState({
            password: false,
            message: event.message
        });
    }

    before() {
        if (this.mounted) {
            this.setState({
                wait: true,
                error: null,
                message: null
            });
        }
    }

    success(result, message) {
        if (this.mounted) {
            this.user = result;
            this.setState({
                wait: false,
                user: clone(this.user),
                message: message
            }, () => {
                this.props.onCheck();
            });
        }
    }

    fail(error) {
        if (this.mounted) {
            this.setState({
                wait: false,
                error: error
            });
        }
    }

    changed() {
        return (
            this.state.user.firstName !== this.user.firstName ||
            this.state.user.lastName !== this.user.lastName
        );
    }

    cancel() {
        if (this.mounted) {
            this.setState({user: clone(this.user)});
        }
    }

    save() {
        if (this.mounted && !this.state.wait) {
            this.before();
            post({
                url: '/api/user/update',
                data: {user: this.state.user},
                success: (result, message) => {
                    this.success(result, message);
                },
                fail: (status, error) => {
                    this.fail(error.message);
                }
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let buttons = null;
        if (this.changed()) {
            buttons = (
                <div style={style.buttons}>
                    <TButton style={style.cancel} name={'cancel'} onClick={this.handleClick}>Отмена</TButton>
                    <TButton style={style.save} name={'save'} onClick={this.handleClick}>Сохранить</TButton>
                </div>
            );
        }

        let password = null;
        if (this.state.password) {
            password = (
                <Password user={this.state.user} onClose={this.handlePassword} />
            );
        }

        return (

            <div style={style}>

                <TPanel style={style.panel}>
                    <div style={style.text}>
                        Для начала работы нажмите на кнопку меню в левом верхнем углу
                    </div>
                </TPanel>

                <TScroll style={style.scroll}>

                    <div style={style.content}>

                        <TText
                            style={style.login}
                            name={'email'}
                            label={'Логин:'}
                            layout={'top'}
                            value={this.state.user.username}
                            readOnly={true}
                            onChange={this.handleChange} />

                        <div style={style.buttons}>

                            <TButton
                                style={style.password}
                                name={'password'}
                                onClick={this.handleClick}>
                                Изменить пароль
                            </TButton>

                        </div>

                        <TResponse error={this.state.error} message={this.state.message} />

                        {buttons}

                    </div>

                </TScroll>

                {password}

            </div>

        );

    }

}

Landing.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onTools: PropTypes.func.isRequired,
    onCaption: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired
};

export default Landing;