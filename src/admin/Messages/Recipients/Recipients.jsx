import React from 'react';
import PropTypes from 'prop-types';

import {
    TScroll,
    TTable,
    merge,
    clone,
    post
} from 'tinput';

import styles from './styles.js';


class Recipients extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        let style = merge(styles, this.props.style);
        let content = [];
        let i=0;

        if(this.props.message){
            // if (this.props.message.types.length>0){
            //     content.push(
            //         <p style={style.group} key={i}><b>Тип</b></p>
            //     );
            //     i++;
            //     this.props.message.types.forEach((v, j) => {
            //         content.push(
            //             <p style={style.string} key={i}>&nbsp;&nbsp;{v.name}</p>
            //         );
            //         i++;
            //     });
            // }
            // if (this.props.message.filials.length>0){
            //     content.push(
            //         <p style={style.group} key={i}><b>Филиал</b></p>
            //     );
            //     i++;
            //     this.props.message.filials.forEach((v, j) => {
            //         content.push(
            //             <p style={style.string} key={i}>&nbsp;&nbsp;{v.name}</p>
            //         );
            //         i++
            //     });
            // }
            if (this.props.message.departments.length>0){
                content.push(
                    <p style={style.group} key={i}><b>Отдел</b></p>
                );
                i++;
                this.props.message.departments.forEach((v, j) => {
                    content.push(
                        <p style={style.string} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{v.name}</p>
                    );
                    i++
                });
            }
            if (this.props.message.users.length>0){
                content.push(
                    <p style={style.group} key={i}><b>Пользователь</b></p>
                );
                i++;
                this.props.message.users.forEach((v, j) => {
                    content.push(
                        <p style={style.string} key={i}>&nbsp;&nbsp;&nbsp;&nbsp;{v.name}</p>
                    );
                    i++
                });
            }
        }
        return (
            <div style={style.container}>
                <div style={style.head}>
                    <b>{'Получатели'}</b>
                </div>
                <div style={style.list}>
                    {content}
                </div>
            </div>
        );
    }
}

Recipients.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default Recipients;
