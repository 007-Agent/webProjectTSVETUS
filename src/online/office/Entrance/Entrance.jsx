import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TItemGroup,
    TScroll,
    TButton,
    merge,
    clone
} from 'tinput';

import Login from './Login';
import SignUp from './SignUp';
import Recover from './Recover';

import styles from './styles.js';

class Entrance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            indexes: [0]
        };
        this.user = props.user ? props.user : {};
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleRecover = this.handleRecover.bind(this);
        this.handleRecoverClick = this.handleRecoverClick.bind(this);
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

    handleGroupChange(event) {
        this.setState({indexes: event.indexes});
    }

    handleSignUp() {
        this.setState({indexes: [0]});
    }

    handleRecover() {
        this.setState({indexes: [0]});
    }

    handleRecoverClick() {
        this.setState({indexes: []});
    }

    render () {

        let style = merge(styles, this.props.style);

        let content = null;
        if (this.state.indexes.length === 0) {
            content = <Recover style={style.component} onRecover={this.handleRecover} />;
        } else if (this.state.indexes[0] === 0) {
            content = <Login style={style.component} store={this.props.store} onEvent={this.props.onEvent} />;
        } else {
            content = <SignUp style={style.component} onSignUp={this.handleSignUp} />;
        }

        let recover = null;
        if (this.state.indexes.length > 0) {
            recover = (
                <div
                    style={style.recover}
                    onClick={this.handleRecoverClick}>
                    {'Восстановить пароль'}
                </div>
            );
        }

        return (

            <div style={style.container}>

                <TPanel style={style.panel}>
                    <TItemGroup
                        style={style.group}
                        grouped={true}
                        indexes={this.state.indexes}
                        items={[
                            {key: 1, value: 'Вход', group: 1},
                            {key: 2, value: 'Регистрация', group: 1}
                        ]}
                        onChange={this.handleGroupChange} />
                    {recover}
                </TPanel>

                <TScroll style={style.scroll}>

                    {content}

                </TScroll>

            </div>

        );

    }

}

Entrance.propTypes = {
    style: PropTypes.object,
    store: PropTypes.object.isRequired,
    onEvent: PropTypes.func
};

export default Entrance;
