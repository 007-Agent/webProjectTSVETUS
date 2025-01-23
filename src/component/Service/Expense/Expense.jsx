import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.js';

import {
    merge,
    clone,
    TText
} from 'tinput';

class Expense extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let str = event.value ? event.value.replace(',', '.') : '';
        if (str.trim() === '') {
            str = '0';
        }
        let val = parseFloat(str);
        if (val !== NaN) {
            let expense = clone(this.props.expense);
            expense.count = val;
            this.props.onChange({expense: expense, index: this.props.index});
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <div style={style.container}>
                <div style={style.name}>{this.props.expense.material.name}</div>
                <div style={style.box}>
                    <TText
                        style={style.count}
                        value={this.props.expense.count}
                        name={'count'}
                        onChange={this.handleChange} />
                    <div style={style.unit}>{this.props.expense.material.unit.name}</div>
                </div>
            </div>
        );

    }

}

Expense.propTypes = {
    style: PropTypes.object,
    expense: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default Expense;
