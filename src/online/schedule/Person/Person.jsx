import React from 'react';
import PropTypes from 'prop-types';

import {merge, TSelectBox} from 'tinput';

import styles from './styles.js';

function filter(items, branchId, departmentId) {
    if (items) {
        return items.filter(v => {
            return (!branchId || v.branch.id === branchId) && (!departmentId || v.department.id === departmentId);
        });
    } else {
        return [];
    }
}

class Person extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: filter(props.items, props.branchId, props.departmentId)
        };
        this.handleFrame = this.handleFrame.bind(this);
    }

    componentDidUpdate(old) {
        if (old.items !== this.props.items || old.branchId !== this.props.branchId ||
            old.departmentId !== this.props.departmentId) {
            this.setState({items: filter(this.props.items, this.props.branchId, this.props.departmentId)});
        }
    }

    handleFrame(event) {
        let style = event.style;
        let department = this.props.departmentId ? null :
            <div style={style.department}>{event.item.department.name}</div>;
        let branch = this.props.branchId ? null :
            <div style={style.branch}>{event.item.branch.name}</div>;
        let footer = this.props.personId && !this.props.departmentId ? null :
                <div style={style.box}>
                    {department}
                    {branch}
                </div>;
        return (
            <div style={style.container}>
                <div style={style.person}>{event.item.name}</div>
                {footer}
            </div>
        );
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <TSelectBox
                style={style}
                items={this.state.items}
                timeout={0}
                name={this.props.name}
                keyField={'id'}
                valueField={'name'}
                value={this.props.personId}
                placeholder={'Выберите врача'}
                onChange={this.props.onChange}
                onFrame={this.handleFrame} />
        );

    };

}

Person.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    personId: PropTypes.number,
    branchId: PropTypes.number,
    departmentId: PropTypes.number,
    onChange: PropTypes.func
};

export default Person;