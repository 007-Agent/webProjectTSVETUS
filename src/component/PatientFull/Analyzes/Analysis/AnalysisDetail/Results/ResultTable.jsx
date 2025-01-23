import React from 'react';
import PropTypes from 'prop-types';

import Detail from './Detail/Detail.jsx';

import {
    merge
} from 'tinput';

import styles from './styles.js';

class ResultsTable extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {

        let style = merge(styles.table, this.props.style);

        let options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };

        let rows = [];

        for (let i=0; i<this.props.results.length; i++) {

            let r = this.props.results[i];

            let dts = style.body.cell;
            let date = new Date(r.date);

            rows.push(
                <tr key={"c" + i}>
                    <td style={merge(dts, style.body.one)}>{r.num}</td>
                    <td style={merge(dts, style.body.two)}>{r.name}</td>
                    <td style={merge(dts, style.body.three)}>{r.unit}</td>
                    <td style={merge(dts, style.body.four)}>{r.result}</td>
                    <td style={merge(dts, style.body.five)}>{r.norma}</td>
                    <td style={merge(dts, style.body.six)}>{r.deviation}</td>
                    <td style={merge(dts, style.body.seven)}>{date.toLocaleString("ru", options)}</td>
                </tr>
            );

            if (r.detail) {
                rows.push (
                    <tr key={"d" + i}>
                        <td style={dts} colSpan={7}>
                            <Detail style={style.detail} detail={r.detail} />
                        </td>
                    </tr>
                );
            }

        }

        return (
            <div style={style.container}>
                <table style={style.table}>
                    <thead>
                        <tr>
                            <th style={style.head.number}>№</th>
                            <th style={style.head.name}>Название</th>
                            <th style={style.head.units}>Единицы</th>
                            <th style={style.head.result}>Результат</th>
                            <th style={style.head.norma}>Норма</th>
                            <th style={style.head.deviation}>Отклонение</th>
                            <th style={style.head.date}>Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );

    }

}

ResultsTable.propTypes = {
    style: PropTypes.object,
    results: PropTypes.array.isRequired
};

export default ResultsTable;
