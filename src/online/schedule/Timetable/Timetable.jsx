import React from 'react';
import PropTypes from 'prop-types';

import {
    TGrid,
    firstDate,
    lastDate,
    isoDate,
    merge,
    clone
} from 'tinput';

import styles from './styles.js';

const caps = [
    {name: 'sunday', caption: 'вс', dec: 6},
    {name: 'monday', caption: 'пн', dec: 0},
    {name: 'tuesday', caption: 'вт', dec: 1},
    {name: 'wednesday', caption: 'ср', dec: 2},
    {name: 'thursday', caption: 'чт', dec: 3},
    {name: 'friday', caption: 'пт', dec: 4},
    {name: 'saturday', caption: 'сб', dec: 5}
];

class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.getItems = this.getItems.bind(this);
        this.getColumns = this.getColumns.bind(this);
        this.handleCellValue = this.handleCellValue.bind(this);
    }

    getColumns() {
        return {
            [caps[1].name]: {caption: caps[1].caption},
            [caps[2].name]: {caption: caps[2].caption},
            [caps[3].name]: {caption: caps[3].caption},
            [caps[4].name]: {caption: caps[4].caption},
            [caps[5].name]: {caption: caps[5].caption},
            [caps[6].name]: {caption: caps[6].caption},
            [caps[0].name]: {caption: caps[0].caption}
        }
    }

    getItems() {
        if (this.props.year > 0 && this.props.month >= 0) {
            let today = new Date();
            let day = firstDate(this.props.year, this.props.month);
            let to = lastDate(this.props.year, this.props.month);
            day.setDate(day.getDate() - caps[day.getDay()].dec);
            to.setDate(to.getDate() + 6 - caps[to.getDay()].dec);
            let item = {};
            let items = [];
            while (day <= to) {
                let intervals = this.props.schedule.filter(v => {
                    return v.date === isoDate(day);
                });
                let name = caps[day.getDay()].name;
                item[name] = {
                    date: clone(day),
                    active: day.getMonth() === this.props.month,
                    current: (day.getMonth() === today.getMonth()) && (day.getDate() === today.getDate()),
                    intervals: intervals
                };
                if (day.getDay() === 0) {
                    items.push(clone(item));
                }
                day.setDate(day.getDate() + 1);
            }
            return items;
        } else {
            return [];
        }
    }

    handleCellValue(event) {

        let style = event.style.frame;

        let cs = style.cell;
        let ds = style.date;

        if (event.cell.active) {
            cs = merge(cs, style.active);
            ds = merge(ds, style.dateActive);
        }

        if (event.cell.current) {
            cs = merge(cs, style.current);
        }

        let intervals = event.cell.intervals.map((v, i) => {
            return <div key={i} style={style.time}>{v.begTime + ' - ' + v.endTime}</div>;
        });

        let d = event.cell.date.getDate();
        let date = d < 10 ? '0' + d : '' + d;

        return (
            <div style={cs}>
                <div style={style.top}>
                    <div style={ds}>
                        {date}
                    </div>
                </div>
                {intervals}
            </div>
        );

    }

    render() {

        let style = merge(styles, this.props.style);

        if (this.props.personId && this.props.departmentId) {

            return (
                <TGrid
                    style={style}
                    options={{showSelected: false}}
                    columns={this.getColumns()}
                    items={this.getItems()}
                    onCellValue={this.handleCellValue}>
                </TGrid>
            );

        } else {

            return null;

        }

    };

}

Timetable.propTypes = {
    style: PropTypes.object,
    schedule: PropTypes.array,
    branchId: PropTypes.number,
    departmentId: PropTypes.number,
    personId: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number
};

export default Timetable;