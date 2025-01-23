import {connect} from 'react-redux';

import Login from './Login.jsx';

import {clear, logout, login, check} from 'tinput';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        error: state.error,
        wait: state.wait
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClear: () => {
            dispatch(clear());
        },
        onLogout: () => {
            dispatch(logout());
        },
        onLogin: (username, password) => {
            dispatch(login(username, password));
        },
        onCheck: () => {
            dispatch(check());
        }
    }
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Container;
