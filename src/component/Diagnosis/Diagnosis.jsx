import React from 'react';
import PropTypes from 'prop-types';

import {
    TSearch,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Diagnosis extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    handleSearch(query, callback) {
        post({
            url: '/rest/pol/diagnoses',
            data: query,
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
                value={this.props.value}
                name={this.props.name}
                label={this.props.label}
                keyName={'code'}
                showType={'union'}
                placeholder={'Код / название'}
                showButton={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange} />
        );

    }

}

Diagnosis.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Diagnosis;
