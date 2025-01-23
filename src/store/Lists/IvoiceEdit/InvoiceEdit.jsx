import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

function getDate() {
    let date = new Date();
    return isoDate(date);
}


class InvoiceEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {

        let style = merge(styles, this.props.style);
        return (
            <div>
                InvoiceEdit + {this.props.type}
            </div>
        );

    }

}

InvoiceEdit.propTypes = {
    style: PropTypes.object
};

export default InvoiceEdit;
