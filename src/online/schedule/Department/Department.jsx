import React from 'react';
import PropTypes from 'prop-types';

import {TSelectBox, merge} from 'tinput';

import styles from './styles.js';

function filter(items, branchId) {
    if (items) {
        return items.filter(v => {
            return !branchId || v.branch.id === branchId;
        });
    } else {
        return [];
    }
}

class Department extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: filter(props.items, props.branchId)
        };
        this.handleFrame = this.handleFrame.bind(this);
    }

    componentDidUpdate(old) {
        if (old.items !== this.props.items || old.branchId !== this.props.branchId) {
            this.setState({items: filter(this.props.items, this.props.branchId)});
        }
    }

    handleFrame(event) {
        let style = event.style;
        return (
            <div style={style.container}>
                <div style={style.department}>{event.item.name}</div>
                {this.props.branchId ? null : <div style={style.branch}>{event.item.branch.name}</div>}
            </div>
        );
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <TSelectBox
                style={style}
                name={this.props.name}
                items={this.state.items}
                timeout={0}
                keyField={'id'}
                valueField={'name'}
                value={this.props.departmentId}
                onChange={this.props.onChange}
                onFrame={this.handleFrame}
                placeholder={'Выберите отделение'} />
        );

    };

}

Department.propTypes = {
    style: PropTypes.object,
    items: PropTypes.array,
    branchId: PropTypes.number,
    departmentId: PropTypes.number,
    onChange: PropTypes.func
};

export default Department;