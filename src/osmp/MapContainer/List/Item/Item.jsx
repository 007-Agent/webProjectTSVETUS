import React from 'react';
import PropTypes from 'prop-types';

import {
    TCheck,
    merge
} from 'tinput';

import styles from './styles.js';
import State from "component/calls/State";

class Item extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            show: 0
        };
        this.handleShow = this.handleShow.bind(this);
    }

    handleShow(){
        if(this.state.show==0){
            this.setState({show: 1});
        }
        else{
            this.setState({show: 0});
        }
        this.props.onShow(this.props.call.id);
    }

    render () {

        let cursor = {cursor: this.props.call.access > 2 ? 'pointer' : 'default'};

        let style = merge(styles, this.props.style, cursor);
        
        let list = [];
        if (this.props.times) {
            this.props.times.forEach((v, i) => {
                if (this.props.call.id == v.to.id) {
                    if (this.props.call.crewId == v.from.crewId) {
                        if (this.props.call.crewId > 0) {
                            let st = {
                                ...style.time,
                                color: this.props.call.color
                            };
                            list.push(
                                <div style={st} key={i}>
                                    {v.time}
                                </div>
                            );
                        }
                    } else {
                        list.push(
                            <div style={style.time} key={i}>
                                {v.from.crewName}&nbsp;&rarr;&nbsp;{v.time}
                            </div>
                        );
                    }
                }
            });
        }

        return (
            <div style={this.props.style}>
                <State call={this.props.call} />
                <div style={style.row}>
                    <div>{this.props.call.number}</div>
                    <div>{this.props.call.reasonName}</div>
                </div>
                <div style={style.pat}>
                    <div>{this.props.call.nib + ' ' + this.props.call.fio}</div>
                </div>
                <div style={style.address}>
                    {this.props.call.address}
                </div>
                <div style={style.bottom}>
                    {list}
                </div>
            </div>
        );

    }

}

Item.propTypes = {
    style: PropTypes.object,
    call: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired,
    times: PropTypes.array
};

export default Item;
