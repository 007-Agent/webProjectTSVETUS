import React from 'react';
import PropTypes from 'prop-types';

import {TForm, TText, TFile, Uploader, merge, post, clone} from 'tinput';

import Contract from 'component/Contract';

import styles from './styles.js';

class Edit extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            wait: false,
            contractId: null,
            description: null,
            file: null,
            message: null,
            error: null
        };
        this.upload = this.upload.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    success(data, message) {
        if (this.mounted) {
            this.setState({
                wait: false,
                message: message,
                error: null
            });
        }
    }

    fail(error) {
        if (this.mounted) {
            this.setState({
                wait: false,
                message: null,
                error: error
            });
        }
    }

    upload() {
        TFile.upload({
            url: '/api/attachment/upload',
            file: this.state.file,
            sender: this
        }, {
            contractId: this.state.contractId,
            description: this.state.description
        });
    }

    handleChange(event) {
        let state = clone(this.state);
        state[event.name] = event.value;
        if (!state.description && event.item && event.item.name) {
            state.description = event.item.name;
        }
        this.setState(state);
    }

    handleButton(event) {
        if (event.button === 'cancel') {
            this.props.onClose(event);
            this.uploader.clear();
        } else if (event.button === 'save') {
            this.upload();
        } else if (event.button === 'ok') {
            if (this.state.error) {
                this.setState({
                    error: null,
                    message: null
                });
            } else {
                this.setState({
                    error: null,
                    message: null
                }, () => {
                    this.props.onClose(event);
                });
            }
        } else {
            this.props.onClose(event);
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let buttons = this.state.file ? {cancel: "Отмена", save: "Сохранить"} :
            {cancel: "Отмена"};

        return (

            <TForm
                style={style.form}
                show={this.props.show}
                buttons={buttons}
                message={this.state.message}
                error={this.state.error}
                wait={this.state.wait}
                onClose={this.handleButton} >

                <Contract
                    style={style.contract}
                    layout={'top'}
                    name={'contractId'}
                    label={'Договор:'}
                    value={this.state.contractId}
                    showIcon={true}
                    nestedIcon={true}
                    onChange={this.handleChange} />

                <TText
                    style={style.file}
                    layout={'top'}
                    name={'description'}
                    label={'Описание:'}
                    value={this.state.description}
                    onChange={this.handleChange} />

                <TFile
                    style={style.file}
                    layout={'top'}
                    name={'file'}
                    label={'Файл:'}
                    nestedIcon={true}
                    value={this.state.file}
                    onChange={this.handleChange} />

            </TForm>

        );

    }

}

Edit.propTypes = {
    style: PropTypes.object,
    show: PropTypes.any,
    onClose: PropTypes.func.isRequired
};

export default Edit;