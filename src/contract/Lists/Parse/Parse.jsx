import React from 'react';
import PropTypes from 'prop-types';

import {TForm, TItemGroup, merge, post} from 'tinput';

import styles from './styles.js';

class Parse extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            action: 0,
            wait: false,
            message: null,
            error: null
        };
        this.parse = this.parse.bind(this);
        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    parse() {
        if (this.mounted) {
            this.setState({wait: true});
            post({
                url: '/api/attachment/parse',
                data: {query: {id: this.props.id, action: this.state.action}},
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
        } else if (event.button === 'save') {
            this.parse();
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

    handleChange(event) {
        this.setState({action: event.value});
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TForm
                style={style.form}
                show={this.props.show}
                buttons={{cancel: "Отмена", save: "Продолжить"}}
                message={this.state.message}
                error={this.state.error}
                wait={this.state.wait}
                onClose={this.handleButton} >

                <TItemGroup
                    label={'Действие'}
                    name={'action'}
                    layout={'left'}
                    control={'radio'}
                    value={this.state.action}
                    items={[{
                            id: 0,
                            name: 'Прикрепить'
                        }, {
                            id: 1,
                            name: 'Открепить'
                    }]}
                    keyField={'id'}
                    valueField={'name'}
                    onChange={this.handleChange} />

            </TForm>

        );

    }

}

Parse.propTypes = {
    style: PropTypes.object,
    show: PropTypes.any,
    id: PropTypes.number,
    onClose: PropTypes.func.isRequired
};

export default Parse;