import React from 'react';
import PropTypes from 'prop-types';

import Allergy from './Allergy.jsx';
import Microbio from './Microbio.jsx';
//import Chart from './Chart.jsx';

import {merge} from 'tinput';

import styles from './styles.js';

class Detail extends React.Component {

    render () {

        let style = merge(styles, this.props.style);

        let content = null;
        switch (this.props.detail.type) {
            case 1:
                content = (
                    <Allergy
                        style={style.allergy}
                        result={this.props.detail.result} />
                );
            break;
            case 2:
                content = (
                    <Microbio
                        style={style.microbio}
                        result={this.props.detail.result} />
                );
            break;
            // case 3:
            //     content = (
            //         <Chart
            //             style={this.props.style.chart}
            //             result={this.props.detail.result} />
            //     );
            // break;
        }

        return (
            <div style={style.container}>
                {content}
            </div>
        );

    }

}

Detail.propTypes = {
    style: PropTypes.object,
    detail: PropTypes.object.isRequired
};

export default Detail;
