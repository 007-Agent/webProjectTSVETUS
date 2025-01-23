import React from 'react';
import PropTypes from 'prop-types';

import {
    strDate,
    merge
} from 'tinput';

import styles from './styles.js';

class Medicament extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        return (
            <div key={this.props.index} style={style.container}>
                <div style={style.date}>{strDate(this.props.antibiotic.date)}</div>
                <div style={style.diagnosis}>{this.props.antibiotic.diagnosisCode}</div>
                <div style={style.tradeName}>{this.props.antibiotic.tradeName}</div>
                {!this.props.short ? <div style={style.medicament}>({this.props.antibiotic.medicament})</div> : null}
            </div>

        );

    }
}

Medicament.propTypes = {
    style: PropTypes.object,
    index: PropTypes.number,
    antibiotic: PropTypes.object.isRequired,
    short: PropTypes.any
};

export default Medicament;
