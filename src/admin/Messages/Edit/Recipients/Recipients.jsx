import React from 'react';
import PropTypes from 'prop-types';

import {
    merge,
    clone,
    post
} from 'tinput';

import styles from './styles.js';

import Departments from "../../../../component/Departments";
import Users from "../../../../component/Users";


class Recipients extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.onChange(event);
    }

    render () {

        let style = merge(styles, this.props.style);

        return (
            <div>
                <Departments
                    style={style.component}
                    name={'departments'}
                    value={this.props.item.departments}
                    onChange={this.handleChange} />

                <Users
                    style={style.component}
                    name={'users'}
                    value={this.props.item.users}
                    onChange={this.handleChange} />
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
