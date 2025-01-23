import React from 'react';
import PropTypes from 'prop-types';

import {
    TLoad,
    merge,
    cutTime,
    post,
    cutDate
} from 'tinput';

import styles from './styles.js';

class Visits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visits: [],
            wait: false
        };
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    refresh() {
        post({
            url: '/api/office/relevance/visits',
            data: {},
            sender: this,
            target: 'visits'
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        let visits = null;
        let caption = null;

        if (this.state.wait) {

            caption = (
                <div style={style.caption}>
                    <TLoad show={true} inline={true} />
                </div>
            );

        } else if (this.state.visits.length === 0) {

            caption = (
                <div style={style.caption}>
                    У вас нет активных записей на прием
                </div>
            );

        } else {

            caption = (
                <div style={style.caption}>
                    Активные записи на прием
                </div>
            );

            let items = this.state.visits.map((v, i) => {
                visits = v.visits.map((vv, ii) => {
                    return (
                        <div style={style.visit.container} key={ii}>
                            <div style={style.visit.date}>{cutDate(vv.date) + ' в ' + cutTime(vv.time)}</div>
                            <div style={style.visit.resource}>{vv.resource}</div>
                            <div style={style.visit.speciality}>{vv.speciality}</div>
                            <div style={style.visit.room}>{'Кабинет: ' + vv.room}</div>
                        </div>
                    );
                });
                return (
                    <div style={style.patient.container} key={i}>
                        <div style={style.patient.name}>{v.patient.firstName}</div>
                        {visits}
                    </div>
                );
            });

            visits = (
                <div style={style.visits}>
                    {items}
                </div>
            );

        }

        return (

            <div style={style.container}>
                {caption}
                {visits}
            </div>

        );

    }

}

Visits.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object
};

export default Visits;
