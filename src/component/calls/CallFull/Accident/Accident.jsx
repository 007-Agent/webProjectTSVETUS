import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    TCheck,
    TMemo,
    merge,
    clone,
    post
} from 'tinput';

import Ref from 'component/Ref';

import styles from './styles.js';

class Accident extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = clone(this.props.data);
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
            url: '/rest/help/accident/update',
            data: {data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: data,
                    modified: false
                }, () => {
                    this.data = clone(data);
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

            <TGroup style={style.group} label={'Причина несчастного случая'}>

                <TCheck
                    style={style.component}
                    name={'crime'}
                    value={this.state.data.crime}
                    label={'Криминальная:'}
                    checked={1}
                    unchecked={0}
                    onChange={this.handleChange} />

                <TCheck
                    style={style.component}
                    name={'dtp'}
                    value={this.state.data.dtp}
                    label={'Дорожно-транспортное проишествие:'}
                    checked={1}
                    unchecked={0}
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_injury'}
                    name={'injuryId'}
                    value={this.state.data.injuryId}
                    label={'Травма:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <TMemo
                    style={style.memo}
                    value={this.state.data.text}
                    name={'text'}
                    onChange={this.handleChange}
                    autoSize={true}
                    valueNull={true}
                    label={'Другое'} />

            </TGroup>

        );

    }

}

Accident.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Accident;
