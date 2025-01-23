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

class Distances extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.data = clone(this.props.data);
        this.state = {
            data: this.props.data,
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
            data: this.data,
            modified: false
        }, () => {
            this.data = clone(this.data);
            this.notify();
        });
    }

    save() {
        post({
            url: '/rest/help/distances/update',
            data: {data: this.state.data},
            sender: this,
            success: (data) => {
                this.setState({
                    data: data,
                    modified: false
                }, () => {
                    this.data = clone(data);
                    this.notify();
                });
            }
        })
    }

    handleChange(event) {
        let data = {
            ...clone(this.state.data),
            [event.name]: event.value
        };
        this.setState({
            data: data,
            modified: true
        }, () => {
            this.notify(this.save, this.cancel);
        });
    }


    render () {

        let style = merge(styles, this.props.style);

        return (

            <TGroup style={style.group} label={'Спидометр'}>

                <TText
                    style={style.distance}
                    name="kmb"
                    placeholder="На начало"
                    value={this.state.data.kmb}
                    onChange={this.handleChange} />

                <div style={style.text}>км</div>

                <TText
                    style={style.distance}
                    name="kme"
                    placeholder="На конец"
                    value={this.state.data.kme}
                    onChange={this.handleChange} />

                <div style={style.text}>км</div>

            </TGroup>

        );

    }

}

Distances.propTypes = {
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Distances;
