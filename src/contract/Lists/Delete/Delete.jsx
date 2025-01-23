import React from 'react';
import PropTypes from 'prop-types';

import {TForm, merge, post} from 'tinput';

import styles from './styles.js';

class Delete extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            wait: false,
            message: null,
            error: null
        };
        this.delete = this.delete.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
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

    delete() {
        if (this.mounted) {
            this.setState({wait: true});
            post({
                url: '/api/attachment/remove',
                data: {query: {id: this.props.id}},
                success: (data, message) => {
                    this.success(data, message);
                },
                fail: (status, error) => {
                    this.fail(error.message);
                }
            });
        }
    }

    handleButton(event) {
        if (event.button === 'cancel') {
            this.props.onClose(event);
        } else if (event.button === 'delete') {
            this.delete();
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

        return (

            <TForm
                style={style.form}
                show={this.props.show}
                buttons={{cancel: "Отмена", delete: "Удалить"}}
                message={this.state.message}
                error={this.state.error}
                wait={this.state.wait}
                onClose={this.handleButton} >

                {'Удалить загруженный список?'}

            </TForm>

        );

    }

}

Delete.propTypes = {
    style: PropTypes.object,
    show: PropTypes.any,
    id: PropTypes.number,
    onClose: PropTypes.func.isRequired
};

export default Delete;