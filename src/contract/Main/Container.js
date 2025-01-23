import {connect} from 'react-redux';

import Main from './Main.jsx';

import {clear, logout, login, check} from 'tinput';

const mapStateToProps = (state, ownProps) => {
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
)(Main);

export default Container;
