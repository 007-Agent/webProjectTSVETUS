import React from 'react';
import PropTypes from 'prop-types';

import {
    TTable,
    strDate,
    cutTime,
    merge
} from 'tinput';

import Detail from './Detail';
import Visit from './Visit';

import styles from './styles.js';

class Observation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({show: !this.state.show});
    }
    render () {

        let style = merge(styles, this.props.style)

        let ob = this.props.observation;

        let detail = [];

        if(this.state.show){
            detail.push(
                <Detail
                    id={ob.id}
                    key={1}
                />
            );
            detail.push(
                <Visit
                    id={ob.id}
                    key={2}
                />
            )
        }

        let year = ob.year;
        let department = ob.department + ',';
        let speciality = ob.speciality;
        let result = ob.result && '' != ob.result.trim() ? `(${ob.result})` : null;

        return (
            <div key={this.props.index}>
                <div style={style.container} onClick={this.click}>
                    <div style={style.date}>{year}</div>
                    <div style={style.doctor}>{department}</div>
                    <div style={style.speciality}>{speciality}</div>
                    <div style={style.speciality}>{result}</div>
                </div>
                <div style={style.detail}>
                    {detail}
                </div>
            </div>
        );

    }

}

Observation.propTypes = {
    style: PropTypes.object,
    index: PropTypes.number,
    Observation: PropTypes.object
};

export default Observation;
