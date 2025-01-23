import React from 'react';
import PropTypes from 'prop-types';

import {
    TSearch,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Contract extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    handleSearch(query, callback) {
        if (query.dog_id > 0 || (query.dog_n_dog && query.dog_n_dog.length >= 4)) {
            post({
                url: '/rest/pol/contracts',
                data: {id: query.dog_id, name: query.dog_n_dog},
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
                name={this.props.name}
                label={this.props.label}
                value={this.props.value}
                showIcon={this.props.showIcon}
                placeholder={this.props.placeholder}
                keyField={'dog_id'}
                valueField={'dog_n_dog'}
                clickable={'edit'}
                nestedIcon={this.props.nestedIcon}
                onSearch={this.handleSearch}
                onChange={this.handleChange} />

        );

    }

}

Contract.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    layout: PropTypes.string,
    value: PropTypes.any,
    showIcon: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    nestedIcon: PropTypes.any,
    placeholder: PropTypes.string
};

Contract.defaultProps = {
    showIcon: false
};

export default Contract;
