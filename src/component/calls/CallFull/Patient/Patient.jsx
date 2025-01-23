import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class Patient extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(styles, this.props.style);

        let finans = '';
        if (this.props.call.age) {
            finans += ' ' + this.props.call.age;
        }
        if (this.props.call.finans) {
            finans += ' ' + this.props.call.finans;
        }
        if (this.props.call.ych) {
            finans += ' уч.' + this.props.call.ych;
        }

        return (
            <div style={style.container}>
                <div style={style.block}>
                    <div style={style.nib}>
                        {this.props.call.nib}
                    </div>
                    <div style={style.fio}>
                        {this.props.call.fio}
                    </div>
                    <div style={style.tip}>
                        {this.props.call.tip}
                    </div>
                </div>
                <div style={style.age}>
                    {finans}
                </div>
            </div>
        );

    }

}

Patient.propTypes = {
    call: PropTypes.object.isRequired
};

export default Patient;
