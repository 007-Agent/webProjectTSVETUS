import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    post
} from 'tinput';

import styles from './styles.js';

import List from 'component/List';

class Users extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    }

    handleSearch(query, callback) {
        if (query.id > 0 || (query.name && query.name.length > 2)) {
            post({
                url: '/rest/pol/users',
                data: query,
                success: (response) => {
                    if (this.mounted) {
                        callback(response);
                    }
                }
            });
        } else {
            callback([]);
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <List
                style={style}
                name={this.props.name}
                label={this.props.label}
                value={this.props.value}
                placeholder={this.props.placeholder}
                showIcon={this.props.showIcon}
                onSearch={this.handleSearch}
                onChange={this.handleChange} />

        );

    }

}

Users.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func
};

Users.defaultProps = {
    label: 'Пользователи',
    placeholder: '',
    showIcon: false
};

export default Users;
