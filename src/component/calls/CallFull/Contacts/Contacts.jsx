import React from 'react';
import PropTypes from 'prop-types';

import {
    TMemo,
    merge,
    clone,
    post
} from 'tinput';

import Ref from 'component/Ref';

import styles from './styles.js';

class Contacts extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = Object.assign({}, this.props.data);
        this.state = {
            data: this.props.data,
            modified: false
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.notify = this.notify.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    notify(save, cancel) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                save: save,
                cancel: cancel
            });
        }
    }

    cancel() {
        this.setState({
            data: this.data,
            modified: false
        }, () => {
            this.data = clone(this.data);
            this.notify();
        });
    }

    save() {
        post({
            url: '/rest/help/contacts/update',
            data: {data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: data,
                    modified: false
                }, () => {
                    this.data = Object.assign({}, data);
                    this.notify();
                });
            }
        })
    }

    handleChange(event) {
        let data = {
            ...clone(this.state.data),
            [event.name]: event.value
        };
        this.setState({
            data: data,
            modified: true
        }, () => {
            this.notify(this.save, this.cancel);
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <div style={style.block}>

                    <div style={style.phone}>
                        {this.state.data.phone}
                    </div>

                    <div style={style.fio}>
                        {this.state.data.fio}
                    </div>

                </div>

                <Ref
                    style={style.component}
                    value={this.state.data.socialId}
                    name={'socialId'}
                    valueNull={true}
                    table={'ref_org'}
                    placeholder={'-'}
                    label={'Социальный статус:'}
                    caption={'Социальный статус:'}
                    onChange={this.handleChange} />

                <TMemo
                    style={style.memo}
                    value={this.state.data.work}
                    name={'work'}
                    onChange={this.handleChange}
                    autoSize={true}
                    valueNull={true}
                    label={'Место работы'} />

                <TMemo
                    style={style.memo}
                    value={this.state.data.document}
                    name={'document'}
                    onChange={this.handleChange}
                    autoSize={true}
                    valueNull={true}
                    label={'Докуменнт удостоверяющий личность'} />

            </div>

        );

    }

}

Contacts.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Contacts;
