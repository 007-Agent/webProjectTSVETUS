import React from 'react';
import PropTypes from 'prop-types';

import {
    nvl,
    merge,
    strDate
} from 'tinput';

import styles from './styles.js';

function toTime(source) {
    return nvl(source, '').substring(0, 5);
}

class TableItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick({index: this.props.index});
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <tr onClick={this.handleClick}>
                <td style={style.cell}>{strDate(this.props.item.callDate)}</td>
                <td style={style.cell}>{this.props.item.crewName}</td>
                <td style={style.cell}>{this.props.item.number}</td>
                <td style={style.cell}>{this.props.item.nib}</td>
                <td style={style.cell}>{this.props.item.fio}</td>
                <td style={style.cell}>{this.props.item.doctor}</td>
                <td style={style.cell}>{this.props.item.driver}</td>
                <td style={style.cell}>{toTime(this.props.item.times.crewReceive)}</td>
                <td style={style.cell}>{toTime(this.props.item.times.crewStart)}</td>
                <td style={style.cell}>{toTime(this.props.item.times.crewArrive)}</td>
                <td style={style.cell}>{toTime(this.props.item.times.callFinish)}</td>
            </tr>
        );

    }

}

TableItem.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default TableItem;
