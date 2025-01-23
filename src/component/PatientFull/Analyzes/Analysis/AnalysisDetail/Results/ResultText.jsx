import React from 'react';
import PropTypes from 'prop-types';

import Detail from './Detail/Detail.jsx';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class ResultsText extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        let style = merge(styles.text, this.props.style);

        let rows = [];
        for (let i=0; i<this.props.results.length; i++) {

            let r = this.props.results[i];
            let lineStyle = style.line;
            let result = r.norma && r.norma !== '' ?
                <div style={style.value}>{r.result}&nbsp;({r.norma})&nbsp;{r.unit}</div> :
                <div style={style.value}>{r.result}&nbsp;{r.unit}</div>;

            rows.push (
                <div  key={"c" + i} style={style.line}>
                    <div style={style.caption}>{r.name}</div>
                    {result}
                </div>
            );

            if (r.detail) {
                rows.push (
                    <div key={"d" + i}>
                        <Detail  style={style.detail} detail={r.detail} />
                    </div>
                );
            }

        }

        return (
            <div style={style.container}>
                {rows}
            </div>
        );

    }

}

ResultsText.propTypes = {
    results: PropTypes.array.isRequired,
    style: PropTypes.object.isRequired
};

export default ResultsText;
