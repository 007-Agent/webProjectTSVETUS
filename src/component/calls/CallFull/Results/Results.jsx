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

class Results extends React.Component {

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
            url: '/rest/help/results/update',
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

            <TGroup style={style.group} label={'Вызов'}>

                <Ref
                    style={style.component}
                    table={'ref_help_type'}
                    name={'typeId'}
                    value={this.state.data.typeId}
                    label={'Тип вызова:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_from'}
                    name={'fromId'}
                    value={this.state.data.fromId}
                    label={'Место вызова:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_res'}
                    name={'resultId'}
                    value={this.state.data.resultId}
                    label={'Результат:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_prof'}
                    name={'profId'}
                    value={this.state.data.profId}
                    label={'Профиль бригады:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_where'}
                    name={'whereId'}
                    value={this.state.data.whereId}
                    label={'Где принят:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_reject'}
                    name={'rejectId'}
                    value={this.state.data.rejectId}
                    label={'Отказ:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_delay'}
                    name={'delayId'}
                    value={this.state.data.delayId}
                    label={'Причина выезда с опозданием:'}
                    placeholder="-"
                    onChange={this.handleChange} />

                <Ref
                    style={style.component}
                    table={'ref_help_negative'}
                    name={'negativeId'}
                    value={this.state.data.negativeId}
                    label={'Безрезультатный вызов:'}
                    placeholder="-"
                    onChange={this.handleChange} />

            </TGroup>

        );

    }

}

Results.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Results;
