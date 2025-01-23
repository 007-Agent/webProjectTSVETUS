import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    cutDate,
    isoDate
} from 'tinput';

import Cell from './Cell';

import styles from './styles.js';

class Table extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.getCell = this.getCell.bind(this);
        this.getRow = this.getRow.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getTemplates = this.getTemplates.bind(this);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getCell(event) {

        let cs = styles.row.cell;

        if (event.day.absent) {
            cs = merge(cs, styles.row.absent);
        } else if (event.person.category === 1) {
            cs = merge(cs, styles.row.doctor);
        } else if (event.person.category === 2) {
            cs = merge(cs, styles.row.assistant);
        }

        return (
            <div
                key={event.index + 'd' + event.number}
                style={cs}>
                <Cell
                    access={event.access}
                    person={event.person}
                    day={event.day}
                    current={this.props.current}
                    departmentId={this.props.departmentId}
                    onEdit={this.props.onEdit} />
            </div>
        );

    }

    getRow(event) {
        let res = [];
        let fs = styles.row.fio;
        if (event.row.person.category === 1) {
            fs = merge(fs, styles.row.doctor);
        } else if (event.row.person.category === 2) {
            fs = merge(fs, styles.row.assistant);
        }
        res.push(
            <div
                key={event.index + 'p' + event.row.person.id}
                style={fs}>
                {event.row.person.name}
            </div>
        );
        event.row.items.forEach((v, i) => {
            res.push(this.getCell({
                day: v,
                index: event.index,
                number: i,
                person: event.row.person,
                access: event.row.access
            }));
        });
        return res;
    }

    getItems() {

        let res = [
            <div
                key={'fio'}
                style={styles.header.corner}
                onClick={this.handleHeaderClick}>
                <div style={styles.header.box}>
                    {'Ф.И.О.'}
                </div>
            </div>
        ];

        let d = new Date(this.props.from);
        let to = new Date(this.props.to);

        while (d.getTime() <= to.getTime()) {
            let bs = styles.header.box;
            if (this.props.current === isoDate(d)) {
                bs = merge(bs, styles.header.current);
            }
            if (d.getDay() === 0) {
                bs = merge(bs, styles.header.sunday);
            }
            if (d.getDay() === 6) {
                bs = merge(bs, styles.header.saturday);
            }
            if (this.props.sort === isoDate(d)) {
                bs = merge(bs, styles.header.sort);
            }
            let cap = cutDate(d);
            res.push(
                <div
                    key={cap}
                    data={isoDate(d)}
                    style={styles.header.date}
                    onClick={this.handleHeaderClick}>
                    <div style={bs}>
                        {cap}
                    </div>
                </div>
            );
            d.setDate(d.getDate() + 1);
        }

        let sch = this.props.schedule;

        if (!sch || sch.length === 0) {
            return res;
        }

        sch.forEach((v, i) => {
            res = res.concat(this.getRow({
                row: v,
                index: i
            }));
        });

        return res;

    }

    getTemplates() {
        let res = "220px";
        let d = new Date(this.props.from);
        let to = new Date(this.props.to);
        while (d.getTime() <= to.getTime()) {
            res += " auto";
            d.setDate(d.getDate() + 1);
        }
        return res;
    }

    handleHeaderClick(event) {
        if (this.props.onSort) {
            let date = event.currentTarget.getAttribute('data');
            if (date) {
                this.props.onSort({date: date});
            } else {
                this.props.onSort({date: null});
            }
        }
    }

    render () {

        let tc = {container: {gridTemplateColumns: this.getTemplates()}};

        let style = merge(styles, this.props.style, tc);

        let items = this.getItems();

        return (
            <div style={style.container}>
                {items}
            </div>
        );

    }

}

Table.propTypes = {
    style: PropTypes.object,
    schedule: PropTypes.array.isRequired,
    current: PropTypes.string,
    from: PropTypes.any,
    to: PropTypes.any,
    sort: PropTypes.any,
    departmentId: PropTypes.number,
    onEdit: PropTypes.func,
    onSort: PropTypes.func
};

export default Table;
