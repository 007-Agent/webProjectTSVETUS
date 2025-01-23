import React from 'react';
import PropTypes from 'prop-types';

import {
    TButton,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class PatientCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            wait: false,
            patients: null
        };
        this.refresh = this.refresh.bind(this);
        this.check = this.check.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.modified = true;
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    refresh() {
        post({
            url: '/api/office/patient/list',
            data: {},
            sender: this,
            target: 'patients'
        });
    }

    check() {
        return (
            this.state.patients && this.state.patients.length > 0
        )
    }

    handleClick() {
        if (this.props.onPage) {
            this.props.onPage({page: 'patients'});
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        if (this.check()) {

            return null;

        } else  {

            return (

                <div style={style.container}>
                    <div style={style.text}>
                        У вас пока нет пациентов в личном кабинете
                    </div>
                    <TButton
                        style={style.button}
                        onClick={this.handleClick}>
                        Добавить пациента
                    </TButton>
                </div>

            );

        }

    }

}

PatientCheck.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onPage: PropTypes.func
};

export default PatientCheck;
