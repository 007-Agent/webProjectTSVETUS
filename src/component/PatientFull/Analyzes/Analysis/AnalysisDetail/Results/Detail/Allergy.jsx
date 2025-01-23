import React from 'react';
import PropTypes from 'prop-types';


class Allergy extends React.Component {

    render () {

        let style = this.props.style;

        let values = [];
        for (let i=0; i<this.props.result.values.length; i++) {
            let v = this.props.result.values[i];
            values.push(
                <div key={i} style={style.results}>
                    {v.num}&nbsp;
                    LU:&nbsp;{v.lu}&nbsp;
                    Аллерген:&nbsp;{v.allergen}&nbsp;
                    Класс:&nbsp;{v.allergenClass}
                </div>
            );
        }

        return (
            <div>
                <div style={style.header}>
                    <div style={style.line}>
                        <div style={style.caption}>Контрольное значение положительного результата:</div>
                        <div style={style.value}>{this.props.result.positive}</div>
                    </div>
                    <div style={style.line}>
                        <div style={style.caption}>Статус положительного результата:</div>
                        <div style={style.value}>{this.props.result.positive_q}</div>
                    </div>
                    <div style={style.line}>
                        <div style={style.caption}>Контрольное значение отрицательного результата:</div>
                        <div style={style.value}>{this.props.result.negative}</div>
                    </div>
                    <div style={style.line}>
                        <div style={style.caption}>Статус отрицательного результата:</div>
                        <div style={style.value}>{this.props.result.negative_q}</div>
                    </div>
                </div>
                <div style={style.values.container}>
                    {values}
                </div>
            </div>
        );

    }

}

Allergy.propTypes = {
    result: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
}

export default Allergy;
