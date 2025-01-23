import React from 'react';
import PropTypes from 'prop-types';

import {
    TButton,
    merge
} from 'tinput';

import styles from './styles.js';

class Saver extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {wait: false};
        this.handleClick = this.handleClick.bind(this);
        this.check = this.check.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.timer);
    }

    check() {
        this.count += 1;
        let found = this.props.tasks.find(v => {return v.cancel && v.save});
        if (found) {
            if (this.count >= 15) {
                this.setState({wait: false}, () => this.stop());
            } else {
                this.timer = setTimeout(this.check, 1000);
            }
        } else {
            this.props.onClear();
            this.setState({wait: false}, () => this.stop());
        }
    }

    start() {
        this.count = 0;
        this.timer = setTimeout(this.check, 2000);
    }

    stop() {
        this.count = 0;
    }

    handleClick(event) {
        if (this.mounted && !this.state.wait) {
            this.props.tasks.forEach((v) => {
                if (event.name === 'cancel' && v.cancel) {
                    v.cancel();
                } else if (event.name === 'save' && v.save) {
                    v.save();
                }
            });
            this.setState({wait: true}, () => this.start());
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let cs = style.container;
        if(this.props.tasks.length > 0) {
            cs = merge(cs, style.show);
        } else{
            cs = merge(cs, style.hidden);
        }

        return (

            <div style={cs}>

                <TButton
                    style={style.cancel}
                    name={'cancel'}
                    wait={this.state.wait}
                    onClick={this.handleClick}>
                    Отмена
                </TButton>

                <div> {this.state.error} </div>

                <TButton
                    style={style.save}
                    name={'save'}
                    wait={this.state.wait}
                    onClick={this.handleClick}>
                    Сохранить
                </TButton>

            </div>

        );

    }

}

Saver.propTypes = {
    tasks: PropTypes.array.isRequired,
    onClear: PropTypes.func.isRequired
};

export default Saver;
