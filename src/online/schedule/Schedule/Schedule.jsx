import React from 'react';
import PropTypes from 'prop-types';

import {
    TScroll,
    TPanel,
    merge,
    clone,
    Sizer
} from 'tinput';

import styles from './styles.js';

import Branch from '../Branch';
import Department from '../Department';
import Person from '../Person';
import Calendar from '../Calendar';
import Timetable from '../Timetable';
import Timeline from '../Timeline';

class Schedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            branchId: 0,
            departmentId: 0,
            personId: 0,
            year: 0,
            month: 0,
            items: []
        };
        this.handleControlsChange = this.handleControlsChange.bind(this);
        this.handleCalendarChange = this.handleCalendarChange.bind(this);
        this.sizer = new Sizer(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        this.sizer.free();
    }

    handleControlsChange(event) {
        let state = {
            ...clone(this.state),
            [event.name]: event.value
        };
        if (event.name === 'branchId') {
            state.departmentId = 0;
            state.personId = 0;
        } else if (event.name === 'departmentId') {
            if (event.item) {
                state.branchId = event.item.branch.id;
            }
            state.personId = 0;
        } else if (event.name === 'personId') {
            if (event.item) {
                state.branchId = event.item.branch.id;
                state.departmentId = event.item.department.id;
            }
        }
        let items = [];
        if (state.departmentId && state.personId) {
            items = this.props.schedule.filter(v => {
                return v.persId == state.personId && v.cabId == state.departmentId;
            });
        }
        state.items = items;
        this.setState(state);
    }

    handleCalendarChange(event) {
        let state = clone(this.state);
        this.setState({
            ...state,
            year: event.year,
            month: event.month
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        let caption = this.state.width < 600 ? null : <div style={style.caption}>Расписание</div>;

        let content = this.state.width < 600 ?
            <Timeline
                year={this.state.year}
                month={this.state.month}
                branchId={this.state.branchId}
                departmentId={this.state.departmentId}
                personId={this.state.personId}
                schedule={this.state.items} /> :
            <Timetable
                year={this.state.year}
                month={this.state.month}
                branchId={this.state.branchId}
                departmentId={this.state.departmentId}
                personId={this.state.personId}
                schedule={this.state.items} />;

        return (

            <div
                style={style.container}>

                <TPanel style={style.panel}>

                    {caption}

                    <div style={style.controls}>

                        <Branch
                            style={style.component}
                            name={'branchId'}
                            items={this.props.branches}
                            branchId={this.state.branchId}
                            onChange={this.handleControlsChange} />

                        <Department
                            style={style.component}
                            name={'departmentId'}
                            items={this.props.departments}
                            branchId={this.state.branchId}
                            departmentId={this.state.departmentId}
                            onChange={this.handleControlsChange} />

                        <Person
                            style={style.component}
                            name={'personId'}
                            items={this.props.personal}
                            branchId={this.state.branchId}
                            departmentId={this.state.departmentId}
                            personId={this.state.personId}
                            onChange={this.handleControlsChange} />

                    </div>

                    <Calendar
                        style={style.calendar}
                        name={'calendar'}
                        onChange={this.handleCalendarChange} />

                </TPanel>

                <TScroll style={style.scroll}>

                    {content}

                </TScroll>

            </div>

        );

    }

}

Schedule.propTypes = {
    style: PropTypes.object,
    branches: PropTypes.array,
    departments: PropTypes.array,
    personal: PropTypes.array,
    schedule: PropTypes.array
};

export default Schedule;