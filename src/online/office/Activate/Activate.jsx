import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TResponse,
    TButton,
    merge,
    post,
    params
} from 'tinput';

import Header from '../Header';

import styles from './styles.js';

class Activate extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            wait: false,
            error: null,
            message: null
        };
        this.validate = this.validate.bind(this);
    }

    componentDidMount(){
        this.mounted = true;
        this.validate();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    validate(){
        let par = params(window.location.href);
        post({
            url: '/api/login/link/activate',
            data: {
                user: par.user,
                mail: par.mail
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
                    <TResponse
                        style={style.response}
                        wait={this.state.wait}
                        error={this.state.error}
                        message={this.state.message}>
                    </TResponse>
                    <TButton
                        style={style.back}
                        onClick={() => {window.location.href = '/office'}}>
                        На главную страницу
                    </TButton>
                </div>
            </div>
        );

    }

}

Activate.propTypes = {
    style: PropTypes.object
};

export default Activate;
