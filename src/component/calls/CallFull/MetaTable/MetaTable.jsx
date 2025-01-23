import React from 'react';
import PropTypes from 'prop-types';

import {
    TGroup,
    TText,
    merge,
    clone,
    post
} from 'tinput';

import styles from './styles.js';

class MetaTable extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.data = this.props.data.slice();
        this.state = {
            data: this.props.data.slice(),
            modified: false
        };
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.notify = this.notify.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    notify(save, cancel) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                save: save,
                cancel: cancel
            });
        }
    }

    cancel() {
        this.setState({
            data: clone(this.data),
            modified: false
        }, () => {
            this.notify();
        });
    }

    save() {
         post({
             url: '/rest/help/' + this.props.name + '/update',
             data: {data: this.state.data},
             sender: this,
             success: (data) => {
                 this.setState({
                     data: data.slice(),
                     modified: false
                 }, () => {
                     this.data = data.slice();
                     this.notify();
                 });
             }
         })
    }

    handleChange(event) {
        let index = event.data;
        if (index >= 0) {
            let data = clone(this.state.data);
            let md = clone(data[index]);
            md.data.list[0] = {id: 0, order: 0, name: event.value};
            data[index] = md;
            this.setState({
                data: data,
                modified: true
            }, () => {
                this.notify(this.save, this.cancel);
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let head = [];
        let list = [];
        if (this.state.data) {
            this.state.data.forEach((v, i) => {
                let data = v.data;
                let label = data.name;
                let value = null;
                if (data.list.length > 0 && data.list[0]) {
                    value = data.list[0].name;
                }
                head.push(
                    <td key={i} style={style.head}>
                        {label}
                    </td>
                );
                list.push(
                    <td key={i} style={style.value}>
                        <TText
                            key={i}
                            data={i}
                            style={style.input}
                            value={value}
                            name={'text'}
                            onChange={this.handleChange} />
                    </td>
                );
            });
        }

        return (
            <TGroup style={style.group} label={this.props.caption}>
                <table style={style.table}>
                    <tbody>
                        <tr>
                            {head}
                        </tr>
                        <tr>
                            {list}
                        </tr>
                    </tbody>
                </table>
            </TGroup>
        );

    }

}


MetaTable.propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    caption: PropTypes.string
};

export default MetaTable;
