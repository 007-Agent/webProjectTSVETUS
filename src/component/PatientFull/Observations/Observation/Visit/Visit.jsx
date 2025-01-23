import React from 'react';
import PropTypes from 'prop-types';

import {
    TTable,
    TFlexList,
    TGroup,
    strDate,
    cutTime,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Visit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.getVisit = this.getVisit.bind(this);
    }
    componentDidMount() {
        this.mounted = true;
        this.getVisit();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getVisit(){
        post({
            url: '/rest/office/patient/visit',
            data: {
                id: this.props.id
            },
            sender: this,
            target: 'items'
        });
    }

    onCellStyle(event) {
        let style = {};
        if (event.index % 2 > 0) {
            style = merge(style,
                {backgroundColor: "#d8d7ff"});
            }
            if (typeof (event.cell) === 'string' && event.cell.indexOf('11') >= 0) {
                style = merge(
                    style,
                    {backgroundColor: "#ffb0b5"}
                );
            }
        return style;
    }

    onFrame(event) {
        let monthPlan = event.item.monthPlan ? event.item.monthPlan : " ";
        let yearPlan = event.item.yearPlan ? event.item.yearPlan : " ";
        let dateVisit = event.item.dateVisit ? strDate(event.item.dateVisit) : " ";
        let description = event.item.description ? event.item.description : " ";
        return (
            <div
                key={event.index}
                index={event.index}
                style={event.style.frame}
                onClick={event.onClick} >
                <div style={event.style.col}>
                    <div style={event.style.field}>{"Месяц назн. "}</div>
                    <div style={event.style.value}>{monthPlan}</div>
                </div>
                <div style={event.style.col}>
                    <div style={event.style.field}>{"Год назн. "}</div>
                    <div style={event.style.value}>{yearPlan}</div>
                </div>
                <div style={event.style.col}>
                    <div style={event.style.field}>{"Дата приёма "}</div>
                    <div style={event.style.value}>{dateVisit}</div>
                </div>
                <div style={event.style.col}>
                    <div style={event.style.field}>{"Примечание "}</div>
                    <div style={event.style.value}>{description}</div>
                </div>
            </div>
        );
    }

    render () {
        let style = merge(styles, this.props.style);
        if (this.state.items.length>0){
            return (
                <div key={2} style={style.container}>
                <div style={style.visit}>
                    Посещения:
                </div>
                        <TFlexList
                            style={style.list}
                            name={'myGrid'}
                            columns={{
                                monthPlan: {
                                    caption: "Месяц назн.",
                                    width: "1fr"
                                },
                                yearPlan: {
                                    caption: "Год назн.",
                                    width: "1fr"
                                },
                                dateVisit: {
                                    caption: "Дата приёма",
                                    width: "1fr",
                                    value: (v) => {return (strDate(v))}
                                },
                                description: {
                                    caption: "Примечание",
                                    width: "2fr"
                                },
                            }}
                            items={this.state.items}
                            onFrame={this.onFrame}/>
                </div>
            );
        } else{
            return(
                <div></div>
            );
        }


    }
}

Visit.propTypes = {
    style: PropTypes.object,
    index: PropTypes.number,
    visit: PropTypes.object
};

export default Visit;
