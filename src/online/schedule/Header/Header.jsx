import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TIcon,
    merge,
    Sizer
} from 'tinput';

import icons from 'online/resources/icons.js';

import styles from './styles.js';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {width: 0};
        this.handleBack = this.handleBack.bind(this);
        this.sizer = new Sizer(this);
    }

    componentWillUnmount() {
        this.sizer.free();
    }

    handleBack() {

    }

    render () {

        let style = merge(styles, this.props.style);

        let title = null;
        if (this.state.width < 520) {
            title = (
                <div style={style.title.container}>
                    <div style={style.title.content}>
                        ФГБУ ДМЦ
                    </div>
                </div>
            );
        } else if (this.state.width < 720) {
            title= (
                <div style={style.title.container}>
                    <div style={style.title.content}>
                        ФГБУ ДМЦ УДП РФ
                    </div>
                </div>
            );
        } else {
            title = (
                <div style={style.title.container}>
                    <div style={style.title.header}>
                        ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ
                    </div>
                    <div style={style.title.content}>
                        ДЕТСКИЙ МЕДИЦИНСКИЙ ЦЕНТР
                    </div>
                    <div style={style.title.footer}>
                        УПРАВЛЕНИЯ ДЕЛАМИ ПРЕЗИДЕНТА РОССИЙСКОЙ ФЕДЕРАЦИИ
                    </div>
                </div>
            );
        }

        return (

            <TPanel style={style.container} gradient={false}>

                <TIcon style={style.logo} icon={icons.logo} />

                {title}

                <div style={style.home.container}>
                    <TIcon
                        style={style.home.icon}
                        name={'home'}
                        onClick={this.handleBack} />
                    <div
                        style={style.home.back}>
                            {'На сайт'}
                    </div>
                </div>

            </TPanel>

        );

    }

}

Header.propTypes = {
    style: PropTypes.object
};

export default Header;