import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    merge,
    clone,
    post
} from 'tinput';

import Ref from 'component/Ref';

import styles from './styles.js';

class Complication extends React.Component {

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
            url: '/rest/help/сoplication/update',
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

            <TGroup style={style.group} label={'Осложнения'}>

                <Ref
                    style={style.component}
                    table={'ref_complication'}
                    name={'complicationId'}
                    value={this.state.data.complicationId}
                    label={'Осложнения:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_complication_ef'}
                    name={'complicationEfId'}
                    value={this.state.data.complicationEfId}
                    label={'Эффективность мероприятий при осложнении:'}
                    placeholder="-"
                    onChange={this.handleChange} />
            </TGroup>

        );

    }

}

Complication.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Complication;
