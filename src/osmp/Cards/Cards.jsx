import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    TText,
    TDate,
    TItemGroup,
    merge,
    post,
    isoDate
} from 'tinput';

import Person from 'component/Person';
import CallFull from 'component/calls/CallFull';
import TableItem from './TableItem';

import styles from './styles.js';

class Cards extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            doctorId: 0,
            driverId: 0,
            patient: null,
            from: isoDate(new Date()),
            to: isoDate(new Date()),
            execId: 1,
            calls: [],
            index: -1,
            wait: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.close = this.close.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidMount(){
        this.mounted = true;
        this.props.onTools([
              {icon: 'refresh', onClick: this.refresh}
        ]);
        this.props.onCaption(
            <div style={styles.caption}>
                <div>{'Вызовы: '}</div>
                <TItemGroup
                    style={styles.group}
                    name={'execId'}
                    grouped={true}
                    control={'radio'}
                    items={[
                        {key: 1, value: 'ОСМП'},
                        {key: 2, value: 'ПНД'}
                    ]}
                    value={this.state.execId}
                    onChange={this.handleChange} />
            </div>
        );
        this.refresh();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.wait !== this.state.wait || prevState.index !== this.state.index) {
            let is = this.state.wait ? styles.wait : null;
            let rt = this.state.wait ? 700 : null;
            this.props.onTools([
                {icon: 'close', onClick: this.close, active: this.state.index >= 0},
                {icon: 'refresh', onClick: this.refresh, style: is, rotateTime: rt, active: this.state.index < 0}
            ]);
        }
    }

    refresh() {
        this.close();
        post({
            url: '/rest/help/short/calls',
            data: {query: {
                doctorId: this.state.doctorId,
                driverId: this.state.driverId,
                from: this.state.from,
                to: this.state.to,
                execId: this.state.execId
            }},
            sender: this,
            target: 'calls'
        });
    }

    handleChange(event) {
         this.setState({[event.name]: event.value}, () => {
//             this.refresh();
         });
    }

    close(){
        this.setState({index: -1});
    }

    handleClick(event){
        this.setState({index: event.index});
    }

    render () {

        let style = merge(styles, this.props.style);
        let content = [];
        let rows = [];
        if (this.state.index >= 0) {
            let call = this.state.calls[this.state.index];
            content.push(
                <CallFull
                    key={0}
                    call={call}
                    user={this.props.user}
                    onClose={this.close} />
            )
        } else {
            this.state.calls.forEach((v, i) => {
                rows.push(
                    <TableItem
                        key={i}
                        index={i}
                        item={v}
                        onClick={this.handleClick} />
                )
            });
            content.push (
                <div key={0}>
                    <table style={style.table.container}>
                        <thead style={style.table.head}>
                            <tr>
                                <th rowSpan={2} style={style.table.cell.date}>Дата</th>
                                <th rowSpan={2} style={style.table.cell.brig}>Бригада</th>
                                <th rowSpan={2} style={style.table.cell.card}>Карта</th>
                                <th rowSpan={2} style={style.table.cell.nib}>№ И.Б.</th>
                                <th rowSpan={2} style={style.table.cell.fio}>Пациент</th>
                                <th rowSpan={2} style={style.table.cell.fio}>Врач</th>
                                <th rowSpan={2} style={style.table.cell.fio}>Водитель</th>
                                <th colSpan={4} style={style.table.cell.time}>Время</th>
                            </tr>
                            <tr>
                                <th style={style.table.cell.timeSmall}>Передан</th>
                                <th style={style.table.cell.timeSmall}>Выезд</th>
                                <th style={style.table.cell.timeSmall}>Прибытие</th>
                                <th style={style.table.cell.timeSmall}>Завершение</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            )
        }

        return (

            <div style={style.container}>

                <TPanel style={style.panel}>

                    <Person
                        style={style.component}
                        name="doctorId"
                        placeholder={"Врач"}
                        showIcon={false}
                        value={this.state.doctorId}
                        onChange={this.handleChange} />

                    <Person
                        style={style.component}
                        name="driverId"
                        placeholder="Водитель"
                        showIcon={false}
                        value={this.state.driverId}
                        onChange={this.handleChange} />

                    <TText
                        style={style.component}
                        name="patient"
                        password={false}
                        placeholder="ФИО/№ИБ пациента"
                        value={this.state.value}
                        onKeyDown={this.handleKey}
                        onChange={this.handleChange} />

                    <TDate
                        style={style.date}
                        name={"from"}
                        label={"C:"}
                        value={this.state.from}
                        calendar={true}
                        start={1}
                        onChange={this.handleChange} />

                    <TDate
                        style={style.date}
                        name={"to"}
                        label={"По:"}
                        value={this.state.to}
                        calendar={true}
                        start={1}
                        onChange={this.handleChange} />

                </TPanel>

                <TScroll style={style.scroll}>

                    {content}

                </TScroll>

            </div>

        );

    }

}

Cards.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object
};

export default Cards;
