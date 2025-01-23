import React from 'react';
import PropTypes from 'prop-types';


class Microbio extends React.Component {

    render () {

        let style = this.props.style;

        let r = this.props.result;

        let list = [];
        for (let i=0; i<r.pathogens.length; i++) {
            let p = r.pathogens[i];
            let antibiotics = [];
            for (let j=0; j<p.antibiotics.length; j++) {
                let a = p.antibiotics[j];
                antibiotics.push(
                    <div key={j}>
                        {a.name}:&nbsp;{a.zone}
                    </div>
                );
            }
            list.push(
                <div key={i}>
                    <div style={style.pathogen}>
                        <div style={style.line}>
                            <div style={style.caption}>
                                Патоген:
                            </div>
                            <div style={style.value}>
                                {p.name}
                            </div>
                        </div>
                        <div style={style.line}>
                            <div style={style.caption}>
                                Концентрация:
                            </div>
                            <div style={style.value}>
                                {p.concentration.value}
                                ({p.concentration.min} - {p.concentration.max})
                            </div>
                        </div>
                    </div>
                    <div style={style.antibiotics}>
                        {antibiotics}
                    </div>
                </div>
            );
        }

        return (
            <div>
                {list}
            </div>
        );

    }

}

Microbio.propTypes = {
    result: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
}

export default Microbio;
