import React from 'react';
import PropTypes from 'prop-types';

import {
    clone,
    TDate,
    TGroup,
    TIcon,
    merge,
    strDate,
    post
} from 'tinput';

import styles from './styles.js';

class Medicament extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        this.state = {
            data: clone(props.data),
            modified: false
        };
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render () {
        let date = new Date(this.props.data.date);
        let style = merge(styles, this.props.style);

        return (

            <div style={styles.container}>
                {date.toLocaleDateString()+" "+this.props.data.medicament}
            </div>

        );

    }

}

Medicament.propTypes = {
    //data: PropTypes.array.isRequired
};

export default Medicament;
