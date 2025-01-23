import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    TMail,
    TText,
    TMask,
    TDate,
    TListBox,
    TButton,
    TResponse,
    merge,
    clone,
    compare,
    post
} from 'tinput';

import Telephone from './Telephone';

import styles from './styles.js';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.user = props.user ? props.user : {};
        this.state = {
            user: clone(this.user),
            message: null,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.password = this.password.bind(this);
        this.clean = this.clean.bind(this);

    }

    componentDidMount() {
        this.mounted = true;
    }

    componentDidUpdate(old) {
        if (old.user !== this.props.user) {
            this.user = this.props.user ? this.props.user : {};
            this.setState({user: clone(this.user)});
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(event) {
        let user =  {
            ...clone(this.state.user),
            [event.name]: event.value
        };
        this.setState({user: user});
    }

    handleUpdate(){
        this.props.onUpdate();
    }

    cancel() {
        this.setState({user: clone(this.user)});
    }

    save() {
        post({
            url: '/api/webuser/mod',
            data: {user: this.state.user},
            sender: this,
            success: (user) => {
                this.user = user;
                this.setState({user: clone(user)});
                if (this.props.onUpdate) {
                    this.props.onUpdate(user);
                }
            }
        });
    }

    password() {
        post({
            url: '/api/webuser/change/password',
            data: {user: this.state.user},
            sender: this
        });
    }

    clean() {
        this.setState({error: null, message: null});
    }

    render () {

        let style = merge(styles, this.props.style);

        let save = compare(this.user, this.state.user) ?
            <div>
                <TButton
                    style={style.button}
                    wait={this.state.wait}
                    onClick={this.password}>
                    {'Изменить пароль'}
                </TButton>
            </div> :
            <div>
                <TButton
                    style={style.button}
                    wait={this.state.wait}
                    onClick={this.save}>
                    {'Сохранить'}
                </TButton>
                <div
                    style={style.text}
                    onClick={this.cancel}>
                    {'Отменить изменения'}
                </div>
            </div>;

        return (

            <div style={style.container}>

                <TPanel style={style.panel}>
                    {/*<div style={style.text}>*/}
                        Профиль пользователя
                    {/*</div>*/}
                </TPanel>

                <TScroll
                    style={style.scroll} >

                    <div style={style.profile}>

                        <TMail
                            style={style.input}
                            name={'email'}
                            placeholder={'E-mail'}
                            value={this.state.user.email}
                            layout={'top'}
                            readOnly={true}
                            onChange={this.handleChange} />

                        <TText
                            style={style.input}
                            name={'firstName'}
                            placeholder={'Имя'}
                            value={this.state.user.firstName}
                            layout={'top'}
                            onChange={this.handleChange}
                            onValidate={(e) => {
                                return e.value && e.value.length >= 2;
                            }} />

                        <TText
                            style={style.input}
                            name={'lastName'}
                            placeholder={'Фамилия'}
                            value={this.state.user.lastName}
                            layout={'top'}
                            onChange={this.handleChange}
                            onValidate={(e) => {
                                return e.value && e.value.length >= 2;
                            }} />

                        <TText
                            style={style.input}
                            name={'middleName'}
                            placeholder={'Отчество'}
                            value={this.state.user.middleName}
                            layout={'top'}
                            onChange={this.handleChange} />

                        <TMask
                            style={style.input}
                            name={'phone'}
                            label={'Телефон для связи:'}
                            value={this.state.user.phone}
                            layout={'top'}
                            format={{mask: "+7 (NNN) NNN-NN-NN", empty: "_"}}
                            required={'always'}
                            onChange={this.handleChange} />

                        <Telephone
                            user={this.props.user}
                            onUpdate={this.handleUpdate}/>

                        <div style={style.box}>

                            <TDate
                                style={style.birthday}
                                name={'birthday'}
                                label={'Дата рождения:'}
                                value={this.state.user.birthday}
                                layout={'top'}
                                required={'enter'}
                                calendar={true}
                                start={1}
                                nestedIcon={true}
                                onChange={this.handleChange} />

                            <TListBox
                                style={style.gender}
                                name={'polId'}
                                label={'Пол:'}
                                value={this.state.user.polId}
                                layout={'top'}
                                items={[
                                    {id: 1, name: 'Муж'},
                                    {id: 2, name: 'Жен'}
                                ]}
                                empty={{id: 0, name: '---'}}
                                keyField={'id'}
                                valueField={'name'}
                                showIcon={false}
                                onChange={this.handleChange} />

                        </div>

                        <TResponse
                            error={this.state.error}
                            message={this.state.message}
                            wait={this.state.wait}
                            onClose={this.clean} >
                            {save}
                        </TResponse>

                    </div>

                </TScroll>

            </div>

        );

    }

}

Profile.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onUpdate: PropTypes.func
};

export default Profile;
