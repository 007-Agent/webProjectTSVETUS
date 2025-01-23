import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    merge,
    clone,
    post
} from 'tinput';


import Ref from "component/Ref";
import List from "component/List";

import styles from './styles.js';

class Measures extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        this.state = {
            value: null,
            data: clone(props.data),
            modified: false
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.notify = this.notify.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeRef = this.handleChangeRef.bind(this);
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
            data: clone(this.data),
            modified: false
        }, () => {
            this.notify();
        });
    }

    save() {
        post({
            url: '/rest/help/measures/update',
            data: {data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: clone(data),
                    modified: false
                }, () => {
                    this.data = data;
                    this.notify();
                });
            }
        })
    }

    handleChangeRef(event){
        let data = clone(this.state.data);
        if (event.name === 'resuscitation') {
            data.resuscitation = event.value;
        } else if (event.name === 'measures') {
            data.list = event.value;
        }
        this.handleChange(data);
    }

    handleChange(data) {
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

            <TGroup style={style.group} label={'Мероприятия'}>

                <Ref
                   style={style.component}
                   table={'ref_help_rmeas'}
                   placeholder={'-'}
                   label={'Реанимационные:'}
                   value={this.state.data.resuscitation}
                   onChange={this.handleChangeRef}
                   name={'resuscitation'} />

                <List
                    style={style.list}
                    table={'ref_help_mmeas'}
                    name={'measures'}
                    icon={'add'}
                    value={this.state.data.list}
                    label={'Лечебно-профилактические:'}
                    onChange={this.handleChangeRef} />

            </TGroup>

        );

    }

}

Measures.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Measures;
