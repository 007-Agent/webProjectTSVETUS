import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class CallType extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>
                <div style={style.number}>Карта № {this.props.call.number}</div>
                <div style={style.reason}>{this.props.call.reasonName}</div>
                <div style={style.right}>&nbsp;</div>
            </div>

        );

    }

}

CallType.propTypes = {
    call: PropTypes.object.isRequired
};

export default CallType;
