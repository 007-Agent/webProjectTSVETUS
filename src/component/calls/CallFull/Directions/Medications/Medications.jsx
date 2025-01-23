import React from 'react';
import PropTypes from 'prop-types';

import {TMemo, merge, post, clone} from 'tinput';

import List from 'component/List';

import styles from './styles.js';

class Medications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleItem = this.handleItem.bind(this);
    }

    handleSearch(event, callback) {
        if (event.value && event.value.trim() !== '') {
            post({
                url: '/rest/pol/medications',
                data: {groupId: 142, name: event.name},
                success: (items) => {
                    callback(items);
                }
            });
        }
    }

    handleListChange(event) {
        if (this.props.onChange) {
            this.props.onChange({
                index: this.props.index,
                data: event.value
            })
        }
    }

    handleDescChange(event) {
        let index = event.data;
        if (this.props.onChange && index >= 0) {
            let data = clone(this.props.data);
            data[index].description = event.value;
            this.props.onChange({
                index: this.props.index,
                data: data
            })
        }
    }

    handleItem(event) {
        return <div style={event.style.text}>
            <div style={event.style.text}>{event.item.name}</div>
            <TMemo
                style={event.style.memo}
                label={'Схема приема:'}
                value={event.item.description}
                data={event.index}
                onChange={this.handleDescChange} />
        </div>;
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
                onChange={this.handleListChange}
                onSearch={this.handleSearch}
                onItem={this.handleItem} />
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

