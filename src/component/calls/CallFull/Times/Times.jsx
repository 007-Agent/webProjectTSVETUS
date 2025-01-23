import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    TTime,
    merge,
    clone,
    isoTime,
    post
} from 'tinput';

import styles from './styles.js';

class Times extends React.Component {

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
            url: '/rest/help/times/update',
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

    handleIcon(event) {
        let e = {
            ...event,
            value: isoTime(new Date())
        };
        this.handleChange(e);
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <TGroup label={'Время'} style={style.group}>

                <div style={style.text}>Прием/Передача:</div>

                <div style={style.block}>

                    <TTime
                        style={style.time}
                        label={'Принят:'}
                        name={'callEnd'}
                        format={{empty: "-"}}
                        value={this.state.data.callEnd}
                        valueNull={true}

                        onChange={this.handleChange} />

                    <TTime
                        style={style.time}
                        label={'Передан:'}
                        name={'crewReceive'}
                        format={{empty: "-"}}
                        value={this.state.data.crewReceive}
                        valueNull={true}
                        onChange={this.handleChange} />

                </div>

                <div style={style.text}>Выезд/Доезд:</div>

                <div style={style.block}>

                    <TTime
                        style={style.time}
                        label={'Выезд:'}
                        name={'crewStart'}
                        value={this.state.data.crewStart}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                    <TTime
                        style={style.time}
                        label={'Доезд:'}
                        name={'crewArrive'}
                        value={this.state.data.crewArrive}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                </div>

                <div style={style.text}>Медицинская эвакуация:</div>

                <div style={style.block}>

                    <TTime
                        style={style.time}
                        label={'Начало:'}
                        name={'evacBegin'}
                        value={this.state.data.evacBegin}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                    <TTime
                        style={style.time}
                        label={'Конец:'}
                        name={'evacEnd'}
                        value={this.state.data.evacEnd}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                </div>

                <div style={style.text}>Завершение/Возврат:</div>

                <div style={style.block}>

                    <TTime
                        style={style.time}
                        label={'Завершен:'}
                        name={'callFinish'}
                        value={this.state.data.callFinish}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                    <TTime
                        style={style.time}
                        label={'Возврат:'}
                        name={'crewReturn'}
                        value={this.state.data.crewReturn}
                        valueNull={true}
                        icon={'add'}
                        format={{empty: "-"}}
                        onIcon={this.handleIcon}
                        onChange={this.handleChange} />

                </div>

            </TGroup>

        );

    }

}

Times.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Times;
