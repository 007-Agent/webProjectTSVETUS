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


class DetailEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {

        let style = merge(styles, this.props.style);

        return (
            <div>
                EDIT
            </div>
        );

    }

}

DetailEdit.propTypes = {
    style: PropTypes.object
};

export default DetailEdit;
