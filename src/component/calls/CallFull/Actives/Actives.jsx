import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    TText,
    TDate,
    merge,
    isoDate,
    clone,
    post
} from 'tinput';

import Ref from 'component/Ref';

import styles from './styles.js';

class Actives extends React.Component {

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
            url: '/rest/help/actives/update',
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
            value: isoDate(new Date())
        };
        this.handleChange(e);
    }

    handleChange(event) {
        if (event.value && event.name === 'needHours') {
            if (Number.isNaN(parseInt(event.value, 10))) {
                return;
            }
        }
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

            <TGroup style={style.group} label={'Актив'}>

                <Ref
                    style={style.component}
                    table={'ref_need'}
                    name={'needId'}
                    value={this.state.data.needId}
                    label={''}
                    placeholder="-"
                    onChange={this.handleChange} />

                <div style={style.line}>

                    <TDate
                        style={style.date}
                        label={'На дату:'}
                        name={'needDate'}
                        value={this.state.data.needDate}
                        valueNull={true}
                        calendar={true}
                        navigators={'month'}
                        start={1}
                        onChange={this.handleChange} />

                    <TText
                        style={merge(style.component, style.hours)}
                        name="needHours"
                        label="через:"
                        placeholder="час"
                        value={this.state.data.needHours}
                        onChange={this.handleChange} />

                </div>

            </TGroup>

        );

    }

}

Actives.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Actives;
