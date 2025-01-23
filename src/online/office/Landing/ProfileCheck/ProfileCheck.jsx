import React from 'react';
import PropTypes from 'prop-types';

import {
    TButton,
    merge
} from 'tinput';

import styles from './styles.js';

class ProfileCheck extends React.Component {

    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    check() {
        let u = this.props.user;
        return (
            u.firstName &&
            u.lastName &&
            u.phone &&
            u.polId
        )
    }

    handleClick() {
        if (this.props.onPage) {
            this.props.onPage({page: 'profile'});
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
                        Чтобы мы моги связаться с Вами в случае необходимости,
                        заполните пожалуйста все поля профиля
                    </div>
                    <TButton
                        style={style.button}
                        onClick={this.handleClick}>
                        Редактировать профиль
                    </TButton>
                </div>

            );

        }

    }

}

ProfileCheck.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onPage: PropTypes.func
};

export default ProfileCheck;
