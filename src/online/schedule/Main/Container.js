import {connect} from 'react-redux';

import Main from './Main.jsx';

import {clear, logout, login, check} from 'tinput';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        error: state.error,
        wait: state.wait,
        schedule: state.schedule,
        personal: state.personal,
        departments: state.departments,
        branches: state.branches
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
