import React from 'react';
import PropTypes from 'prop-types';

import {merge, TSelectBox} from 'tinput';

import styles from './styles.js';

class Branch extends React.Component {

    render() {

        let style = merge(styles, this.props.style);

        return (
            <TSelectBox
                name={this.props.name}
                style={style}
                items={this.props.items}
                keyField={'id'}
                valueField={'name'}
                value={this.props.branchId}
                placeholder={'Выберите филиал'}
                onChange={this.props.onChange} />
        );

    };

}

Branch.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    branchId: PropTypes.number,
    onChange: PropTypes.func
};

export default Branch;