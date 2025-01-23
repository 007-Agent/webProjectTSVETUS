import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import Interval from './Interval';

import styles from './styles.js';

class Cell extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render () {

        let style = merge(styles, this.props.style);

        let cs = style.container;

        if (this.props.current === this.props.day.date) {
            cs = merge(cs, styles.current);
        }

        let intervals = null;
        if (this.props.day.intervals && this.props.day.intervals.length > 0) {
            intervals = this.props.day.intervals.map((v, i) => {
                return (
                    <Interval
                        key={i}
                        access={this.props.access}
                        interval={v}
                        date={this.props.day.date}
                        personId={this.props.person.id}
                        departmentId={this.props.departmentId}
                        onEdit={this.props.onEdit} />
                );
            });
        } else {
            intervals = (
                <Interval
                    access={this.props.access}
                    date={this.props.day.date}
                    personId={this.props.person.id}
                    departmentId={this.props.departmentId}
                    onEdit={this.props.onEdit} />
            );
        }

        return (
            <div style={cs}>
                {intervals}
            </div>
        );

    }
}

Cell.propTypes = {
    style: PropTypes.object,
    person: PropTypes.object.isRequired,
    day: PropTypes.object.isRequired,
    access: PropTypes.number.isRequired,
    departmentId: PropTypes.number,
    current: PropTypes.any,
    onEdit: PropTypes.func
};

export default Cell;
