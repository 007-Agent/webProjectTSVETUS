import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class Interval extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleClick(event) {
        event.stopPropagation();
        if (this.props.onEdit) {
            let i = this.props.interval;
            if (i) {
                this.props.onEdit({
                    query: {
                        id: i.id,
                        type: i.type,
                        date: this.props.date,
                        from: i.from,
                        to: i.to,
                        crewId: i.crew ? i.crew.id : null,
                        departmentId: this.props.departmentId,
                        personId: this.props.personId
                    }
                });
            } else {
                this.props.onEdit({
                    query: {
                        date: this.props.date,
                        departmentId: this.props.departmentId,
                        personId: this.props.personId
                    }
                });
            }
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let interval = this.props.interval;

        let crew = null;
        let time = null;
        if (interval) {
            if (interval.crew && interval.crew.id > 0) {
                if (interval.crew.type === 2) {
                    crew = (<div style={style.dispatcher}>{interval.crew.name}</div>);
                } else {
                    crew = (<div style={style.crew}>{interval.crew.name}</div>);
                }
            }
            let ts = style.time;
            if (interval.type === 1) {
                ts = merge(ts, style.visit);
            }
            time = (
                <div style={ts}>
                    {interval.from.substr(0, 2) + '-' + interval.to.substr(0, 2)}
                </div>
            );
        }

        return (
            <div style={style.container} onClick={this.handleClick}>
                {crew}
                {time}
            </div>
        );

    }
}

Interval.propTypes = {
    style: PropTypes.object,
    interval: PropTypes.object,
    access: PropTypes.number.isRequired,
    date: PropTypes.any.isRequired,
    departmentId: PropTypes.number,
    personId: PropTypes.number.isRequired,
    onEdit: PropTypes.func
};

export default Interval;
