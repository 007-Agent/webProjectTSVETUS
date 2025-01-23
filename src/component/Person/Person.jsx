import React from 'react';
import PropTypes from 'prop-types';

import {
    TSearch,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Person extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    handleSearch(query, callback) {
        let data={
            ...query,
            departmentId: this.props.depId
        };
        post({
            url: '/rest/pol/persons',
            data: data,
            success: (response) => {
                if (this.mounted) {
                    callback(response);
                }
            }
        });
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <TSearch
                style={style}
                layout={this.props.layout}
                value={this.props.value}
                name={this.props.name}
                label={this.props.label}
                showIcon={this.props.showIcon}
                placeholder={this.props.placeholder}
                keyField={'id'}
                valueField={'name'}
                empty={{id: 0, name: '---'}}
                onSearch={this.handleSearch}
                onChange={this.handleChange} />
        );

    }

}

Person.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    showIcon: PropTypes.any,
    layout: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default Person;
