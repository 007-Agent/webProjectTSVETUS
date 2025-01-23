import React from 'react';
import PropTypes from 'prop-types';

import {merge, TIcon} from 'tinput';

import styles from './styles.js'

class Caption extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {

        let style = merge(styles, this.props.style);

        if (this.props.patient) {

            let patient = this.props.patient;

            return (

                <div style={style.container}>
                    <div style={style.nib}>{patient.nib}</div>
                    <div style={style.box}>
                        <div style={style.name}>{patient.firstName}</div>
                        <div style={style.age}>({patient.age})</div>
                    </div>
                    <TIcon
                        style={style.icon}
                        name={'close'}
                        onClick={this.handleClose} />
                </div>

            );

        } else {

            return (
                <div style={style.container}>
                    <div></div>
                    <div>{this.props.caption}</div>
                    <div></div>
                </div>
            );

        }

    }

}

Caption.propTypes = {
    style: PropTypes.object,
    patient: PropTypes.object,
    caption: PropTypes.string,
    onClose: PropTypes.func
};

export default Caption;