import React from 'react';
import PropTypes from 'prop-types';

//import {Line} from 'react-chartjs-2';

const options = {

    legend: {
        display: false,
    },

    tooltips: {

        callbacks: {
            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null,
        }

    }

}

const data = {

  labels: [],

  datasets: [{
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }]

}

class Chart extends React.Component {

    render () {

        if (this.props.result && this.props.result.points) {
            data.labels = [];
            data.datasets[0].data = [];
            let ps = this.props.result.points;
            for (let i=0; i<ps.length; i++) {
                data.labels.push(ps[i].x);
                data.datasets[0].data.push(ps[i].y);
            }
        }

        return (
             <div>
            //     <Line data={data} options={options} />
             </div>
        );
    }

}

Chart.propTypes = {
    result: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
}

export default Chart;
