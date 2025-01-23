import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    TCheck,
    TText,
    TTime,
    merge,
    clone,
    isoTime,
    post
} from 'tinput';

import Ref from 'component/Ref';

import styles from './styles.js';

class Common extends React.Component {

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
        this.handleIcon = this.handleIcon.bind(this);
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
            url: '/rest/help/common/update',
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

    handleIcon(event) {
        let e = {
            ...event,
            value: isoTime(new Date())
        };
        this.handleChange(e);
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

            <TGroup style={style.group} label={'Общие параметры вызова'}>

                <Ref
                    style={style.component}
                    table={'ref_sick'}
                    name={'sickId'}
                    value={this.state.data.sickId}
                    label={'Заболел:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <TCheck
                    style={style.component}
                    name={'alcohol'}
                    value={this.state.data.alcohol}
                    label={'Признаки алкогольного опьянения:'}
                    valueInt={true}
                    onChange={this.handleChange} />

                <TCheck
                    style={style.component}
                    name={'drug'}
                    value={this.state.data.drug}
                    label={'Признаки наркотического опьянения:'}
                    valueInt={true}
                    onChange={this.handleChange} />

                <TText
                    style={style.component}
                    name="crewName"
                    label="Передан спец.бригаде СМП:"
                    placeholder="*"
                    value={this.state.data.crewName}
                    onChange={this.handleChange} />

                <TTime
                    style={style.time}
                    label={'в:'}
                    name={'transTime'}
                    value={this.state.data.transTime}
                    valueNull={true}
                    icon={'add'}
                    format={{empty: "-"}}
                    onIcon={this.handleIcon}
                    onChange={this.handleChange} />

            </TGroup>

        );

    }

}

Common.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Common;
