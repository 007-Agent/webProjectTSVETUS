import React from 'react';
import PropTypes from 'prop-types';

import {merge, post} from 'tinput';

import List from 'component/List';

import styles from './styles.js';

class Medications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch(event, callback) {
        if (event.value && event.value.trim() !== '') {
            post({
                url: '/rest/pol/materials',
                data: {groupId: 142, name: event.name},
                success: (items) => {
                    callback(items);
                }
            });
        }
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange({
                index: this.props.index,
                data: event.value
            })
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <List
                style={style}
                placeholder={'Название медикамента'}
                chars={3}
                value={this.props.data}
                showIcon={false}
                onChange={this.handleChange}
                onSearch={this.handleSearch} />
        );

    }

}

Medications.propTypes = {
    style: PropTypes.object,
    index: PropTypes.number,
    data: PropTypes.array,
    onChange: PropTypes.func
};

export default Medications;

