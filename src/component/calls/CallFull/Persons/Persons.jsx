import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class Persons extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(styles, this.props.style);

        let doctor = this.props.call.doctor ?
            <div style={style.doctor}>
                {this.props.call.doctor}
            </div> : null;

        let assistant = this.props.call.assistant ?
            <div style={style.assistant}>
                {this.props.call.assistant}
            </div> : null;

        return (
            <div style={style.container}>
                {doctor}
                {assistant}
            </div>
        );

    }

}

Persons.propTypes = {
    call: PropTypes.object.isRequired
};

export default Persons;
