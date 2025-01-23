import React from 'react';
import PropTypes from 'prop-types';

import {
    TSearch,
    TMemo,
    merge,
    post,
    compare
} from 'tinput';

import styles from './styles.js';

class DiagnosisText extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !compare(this.props.value, nextProps.value) ||
            !compare(this.state.text, nextState.text);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    handleCodeChange(event) {
        let code = event.item ? event.item.code : null;
        let name = event.item ? event.item.name : null;
        if (code === null) {
            name = null;
        }
        if (code === null || code === '') {
            if (name === null || name === '') {
                if (this.props.value.name !== null && this.props.value.name !== '') {
                    name = this.props.value.name;
                }
            }
        }
        this.props.onChange({
            name: this.props.name,
            data: this.props.data,
            value: {code: code, name: name}
        });
    }

    handleTextChange(event) {
        this.props.onChange({
            name: this.props.name,
            data: this.props.data,
            value: {code: this.props.value.code, name: event.value}
        });
    }

    handleSearch(event, callback) {
        let query = {
            code: event.key,
            name: event.value
        };
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

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <TSearch
                    style={style.search}
                    value={this.props.value.code}
                    name={'code'}
                    label={this.props.label}
                    keyField={'code'}
                    valueField={'name'}
                    empty={{code: null, name: '---'}}
                    showMode={'key'}
                    listMode={'key value'}
                    showIcon={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleCodeChange} />

                <TMemo
                    style={style.memo}
                    valueNull={true}
                    autoSize={true}
                    name={'text'}
                    value={this.props.value.name}
                    onChange={this.handleTextChange} />

            </div>

        );

    }

}

DiagnosisText.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default DiagnosisText;
