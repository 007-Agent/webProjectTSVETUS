import React from 'react';
import PropTypes from 'prop-types';

import {
    merge
} from 'tinput';

import Item from './Item';

import styles from './styles.js';

class List extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            list: props.list,
            index: -1
        };
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose() {
        this.setState({index: -1});
    }

    handleShow(id){
        this.props.onShow(id);
    }

    getStyle(stateId) {
        if ([1].includes(stateId)) {
            return 'received';
        } else if ([2, 7].includes(stateId)) {
            return 'driving';
        } else if ([3].includes(stateId)) {
            return 'arrived';
        } else if ([4].includes(stateId)) {
            return 'completed';
        } else if ([5].includes(stateId)) {
            return 'returned';
        } else {
            return 'cancelled';
        }
    }

    render () {
        let style = merge(styles, this.props.style);

        let list = [];
        this.props.list.forEach((v, i) => {
            if (v.calc == 0) {
                let bs = v.urgent > 0 ? 'solid' : 'dashed';
                let st = {
                    ...style[this.getStyle(v.stateId)],
                    borderStyle: bs,
                    ...styles.item
                };
                list.push(
                    <Item
                        key={i}
                        index={i}
                        call={v}
                        style={st}
                        times={this.props.times}
                        onShow={this.handleShow} />
                );
            }
        });

        return (
            <div style={style.container}>
                {list}
            </div>
        );

    }

}

List.propTypes = {
    list: PropTypes.array.isRequired,
    show: PropTypes.array.isRequired,
    onFail: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
    times: PropTypes.array
};

export default List;
