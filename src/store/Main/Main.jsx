import React from 'react';
import PropTypes from 'prop-types';

import {TSide, TTop, TLogin, merge} from 'tinput';

import Landing from '../Landing';
import Lists from '../Lists';

import styles from './styles.js';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            page: 'consumption',
            tools: [],
            caption: ''
        };
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleTools = this.handleTools.bind(this);
        this.handleCaption = this.handleCaption.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.connected = this.connected.bind(this);
    }

    componentDidMount() {
        this.props.onCheck();
    }

    handleMenu(event) {
        if (event.name === 'topMenu' && event.icon === 'menu') {
            this.setState({menu: true});
        } else if (event.name === 'sideMenu') {
            this.setState({menu: false});
            if (event.item.name === 'exit') {
                this.setState({page: 'landing'});
                this.props.onLogout();
            } else if (event.item.name === 'close') {
            } else {
                this.setState({page: event.item.name});
            }
        }
    }

    handleLogin(event) {
        if (event.button === 'submit') {
            this.props.onLogin(event.value.username, event.value.password);
        }
    }

    handleTools(tools) {
        this.setState({tools: tools});
    }

    handleCaption(caption) {
        this.setState({caption: caption});
    }

    handleCheck() {
        this.props.onCheck();
    }

    connected() {
        return this.props.user && this.props.user.id > 0;
    }

    render() {

        let style = merge(styles, this.props.style);

        let content = null;
        if (!this.connected()) {
            content = <div></div>;
        } else if (this.state.page === 'landing') {
            content = <Landing
                user={this.props.user}
                onTools={this.handleTools}
                onCaption={this.handleCaption}
                onCheck={this.handleCheck} />
        } else if (this.state.page === 'income') {
            content = <Lists
                onTools={this.handleTools}
                onCaption={this.handleCaption}
                caption={"Приход"}
                type={1}/>
        } else if (this.state.page === 'consumption') {
            content = <Lists
                onTools={this.handleTools}
                onCaption={this.handleCaption}
                caption={"Расход"}
                type={2}/>
        }

        let items = [
            {name: 'landing', caption: 'Главная'},
            {name: 'income', caption: 'Приход'},
            {name: 'consumption', caption: 'Расход'},
            {name: 'exit', caption: 'Выход'}
        ];

        return (

            <div>

                <TSide
                    style={style.side}
                    name={'sideMenu'}
                    show={this.state.menu}
                    items={items}
                    item={this.state.page}
                    onClick={this.handleMenu}  />

                <TTop
                    style={style.top}
                    name={'topMenu'}
                    caption={this.state.caption}
                    tools={this.state.tools}
                    onClick={this.handleMenu} />

                {content}

                <TLogin
                    name={'loginForm'}
                    wait={this.props.wait}
                    show={!this.connected()}
                    error={this.props.error}
                    onLogin={this.handleLogin}
                    onClear={this.props.onClear}
                    labels={{
                        username: 'Имя пользователя:',
                        password: 'Пароль:',
                        submit: 'Вход',
                        cancel: 'Отмена'
                    }}
                    placeholders={{
                        username: '',
                        password: ''
                    }} />

            </div>

        );
    }

}

Main.propTypes = {
    store: PropTypes.object.isRequired,
    user: PropTypes.object,
    wait: PropTypes.any,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired
};

export default Main;
