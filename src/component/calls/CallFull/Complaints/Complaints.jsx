import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    merge,
    clone,
    post
} from 'tinput';

import List from "component/List";

import styles from './styles.js';

class Complaints extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        this.state = {
            id: props.id,
            data: clone(props.data),
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
            data: clone(this.data),
            modified: false
        }, () => {
            this.notify();
        });
    }

    save() {
        post({
            url: '/rest/help/complaints/update',
            data: {id: this.state.id, data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: clone(data),
                    modified: false
                }, () => {
                    this.data = clone(data);
                    this.notify();
                });
            }
        })
    }

    handleChange(event) {
        this.setState({
            data: event.value,
            modified: true
        }, () => {
            this.notify(this.save, this.cancel);
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TGroup style={style.group} label={'Повод к вызову'}>

                <List
                    style={style.list}
                    name={'complaint'}
                    table={'ref_complaint'}
                    value={this.state.data}
                    modal={true}
                    caption={'Повод к вызову'}
                    onChange={this.handleChange} />

            </TGroup>

        );

    }

}

Complaints.propTypes = {
    id: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Complaints;
