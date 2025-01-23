import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    strDate,
    cutTime
} from 'tinput';

import styles from './styles.js';

class State extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render () {
        let cursor = {cursor: this.props.call.access > 2 ? 'pointer' : 'default'};

        let style = merge(styles, this.props.style, cursor);

        let time = this.props.call.stateTime ? cutTime(this.props.call.stateTime) : ' ';

        let date = this.props.call.callDate ? strDate(this.props.call.callDate) : '';

        let crewStyle = {
            ...style.crew,
            color: this.props.call.color
        };

        return (
            <div style={style.container} onClick={this.handleClick}>
                <div style={style.block}>
                    <div style={style.column}>
                        <div style={style.time}>{time}</div>
                        <div style={style.date}>{date}</div>
                    </div>
                    <div style={style.name}>
                        {this.props.call.stateName}
                    </div>
                    <div style={crewStyle}>
                        {this.props.call.crewName}
                    </div>
                </div>
            </div>
        );

    }

}

State.propTypes = {
    call: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default State;
