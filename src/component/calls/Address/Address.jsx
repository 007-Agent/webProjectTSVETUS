import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class Address extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleIconClick = this.handleIconClick.bind(this);
    }
    handleIconClick(){
        this.props.iconClick(this.props.call.id);
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <div style={style.container}>
                {this.props.call.address}
            </div>
        );

    }

}

Address.propTypes = {
    call: PropTypes.object.isRequired
};

export default Address;
