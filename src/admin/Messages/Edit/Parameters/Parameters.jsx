import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    clone,
    post
} from 'tinput';

import styles from './styles.js';

class Parameters extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render () {
        return (
            <div>
            </div>
        );
    }
}

Parameters.propTypes = {
    style: PropTypes.object,
    item: PropTypes.object,
    onChange: PropTypes.func
};

export default Parameters;
