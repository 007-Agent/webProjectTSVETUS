import React from 'react';
import PropTypes from 'prop-types';

import {
    clone,
    TDate,
    TGroup,
    merge,
    post
} from 'tinput';

import Medicaments from 'component/Medicaments';

import Services from './Services';
import Medications from './Medications';

import styles from './styles.js';

class Directions extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        this.state = {
            data: clone(props.data),
            wait: false,
            modified: false
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.notify = this.notify.bind(this);
        this.handleMedicationsChange = this.handleMedicationsChange.bind(this);
        this.handleServicesChange = this.handleServicesChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    notify(save, cancel) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                save: save,
                cancel: cancel
            });
        }
    }

    cancel() {
        this.setState({
            data: clone(this.data),
            modified: false
        }, () => {
            this.notify();
        });
    }

    save() {

        let data = clone(this.state.data);
        data.forEach((v) => {
            v.planDate = this.state.planDate;
        });

        post({
            url: '/rest/help/directions/update',
            data: {id: this.props.id, data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: clone(data),
                    modified: false
                }, () => {
                    this.data = data;
                    this.notify();
                });
            }
        })

    }

    handleServicesChange(event) {
        let data = clone(this.state.data);
        data[event.index].services = event.data;
        this.setState({data: data}, () => {
            this.notify(this.save, this.cancel);
        });
    }

    handleMedicationsChange(event) {
        let data = clone(this.state.data);
        data[event.index].medications = event.data;
        this.setState({data: data, modified: true}, () => {
            this.notify(this.save, this.cancel);
        });
    }

    handleDateChange(event) {
        let data = clone(this.state.data);
        data[event.data].planDate = event.value;
        this.setState({data: data}, () => {
            this.notify(this.save, this.cancel);
        });
    }

    render () {

        let style = merge(styles, this.props.style);

        let content = null;

        if (this.state.data) {

            content = this.state.data.map((v, i) => {
                return (
                    <div style={style.box} key={i} >

                        <TDate
                            style={style.date}
                            label={'На дату:'}
                            name={'needDate'}
                            data={i}
                            value={v.planDate}
                            calendar={true}
                            navigators={'month'}
                            start={1}
                            onChange={this.handleDateChange} />

                        <Services
                            style={style.services}
                            index={i}
                            data={v.services}
                            onChange={this.handleServicesChange}
                            departmentId={v.departmentId}
                            callDate={v.date}
                            id={v.helpId}
                            patientId={v.patientId}
                            whereId={v.whereId}
                            hideExp={true}
                            showDep={true}
                            caption={''} />

                        <div style={style.text}>Медикаментозное лечение:</div>

                        <Medications
                            style={style.list}
                            index={i}
                            data={v.medications}
                            onChange={this.handleMedicationsChange} />


                    </div>
                );
            });

        }

        return (

            <TGroup style={style.group} label={'Направления'}>

                {content}

                <Medicaments
                    style={style}
                    caption={'Антибактериальная терапия:'}
                    patientId={this.props.patientId}
                    short={true}
                    modified={this.state.modified} />

            </TGroup>

        );

    }

}

Directions.propTypes = {
    id: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    patientId: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Directions;
