import React from 'react';
import PropTypes from 'prop-types';

import {merge, clone} from 'tinput';

import Service from 'component/Service';
import Ref from "component/Ref";

import styles from './styles.js';

class ServiceSelector extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            params: props.params ? props.params : {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(event) {
        let params = {
            ...clone(this.state.params),
            [event.name]: event.value
        };
        if (this.props.onChange) {
            this.props.onChange({
                params: this.state.params
            });
        }
        this.setState({params: params});
    }

    handleSelect(event) {
        if (this.mounted && event.service && event.service.code) {
            let service = {
                ...event.service,
                whereId: this.state.params.whereId
            };
            if (this.props.onSelect) {
                this.props.onSelect({
                    service: service,
                    params: this.state.params
                });
            }
            this.setState({service: service}, ()=> {
                this.setState({service: null});
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <Service
                    style={style.search}
                    name={'test'}
                    placeholder={'Код / название услуги'}
                    service={this.state.service}
                    hideInfo={true}
                    params={this.state.params}
                    onChange={this.handleSelect} />

                <div style={style.bottom}>

                    <Ref
                        style={style.where}
                        name={'whereId'}
                        table={'ref_where'}
                        placeholder={'Место'}
                        value={this.state.params.whereId}
                        onChange={this.handleChange} />

                </div>

            </div>

        );

    }

}

ServiceSelector.propTypes = {
    style: PropTypes.object,
    params: PropTypes.shape({
        date: PropTypes.any,
        whereId: PropTypes.number,
        patientId: PropTypes.number,
        departmentId: PropTypes.number
    }),
    onChange: PropTypes.func,
    onSelect: PropTypes.func
};

export default ServiceSelector;
