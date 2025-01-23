import React from 'react';
import PropTypes from 'prop-types';

import {merge, TButton} from 'tinput';

import styles from './styles.js';

const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        let d = new Date();
        this.current = {
            year: d.getFullYear(),
            month: d.getMonth()
        };
        this.state = {
            year: d.getFullYear(),
            month: d.getMonth()
        };
        this.handleChange = this.handleChange.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getDateStr = this.getDateStr.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        this.change();
    }

    handleChange(event) {
        if (event.name === 'left') {
            if (this.current.month - this.state.month < 0) {
                this.setState({month: this.state.month - 1}, () => {
                    this.change();
                });
            }
        } else if (event.name === 'right') {
            if (this.state.month - this.current.month < 1) {
                this.setState({month: this.state.month + 1}, () => {
                    this.change();
                });
            }
        }
    }

    change() {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                ...this.getDate()
            });
        }
    }

    getDate() {
        let month = 0;
        let year = 0;
        if (this.state.month < 0) {
            month = this.state.month + 12;
            year = this.state.year - 1;
        } else if (this.state.month > 11) {
            month = this.state.month - 12;
            year = this.state.year + 1;
        } else {
            month = this.state.month;
            year = this.state.year;
        }
        return {year: year, month: month};
    }

    getDateStr() {
        let date = this.getDate();
        return {
            year: date.year,
            month: months[date.month]
        }
    }

    render() {

        let style = merge(styles, this.props.style);

        let date = this.getDateStr();

        return (
            <div style={style.container}>
                <TButton
                    name={'left'}
                    style={style.button}
                    onClick={this.handleChange}>
                    &#10094;&#10094;&#10094;
                </TButton>
                <div style={style.date}>
                    <div style={style.month}>
                        {date.month}
                    </div>
                    <div style={style.year}>
                        {date.year}
                    </div>
                </div>
                <TButton
                    name={'right'}
                    style={style.button}
                    onClick={this.handleChange}>
                    &#10095;&#10095;&#10095;
                </TButton>
            </div>
        );

    };

}

Calendar.propTypes = {
    style: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default Calendar;