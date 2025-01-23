import React from 'react';
import PropTypes from 'prop-types';

import {
    TIcon,
    merge
} from 'tinput';

import styles from './styles.js';

class Captcha extends React.Component {

    constructor(props) {
        super(props);
        this.state = {index: (new Date()).getTime()};
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        this.setState({index: (new Date()).getTime()});
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>
                <img
                    style={style.img}
                    src={'/api/login/captcha?' + this.state.index} />
                <TIcon
                    style={style.icon}
                    name={'refresh'}
                    onClick={this.handleRefresh} />
            </div>

        );

    }

}

Captcha.propTypes = {
    style: PropTypes.object
};

export default Captcha;