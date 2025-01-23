import React from 'react';
import PropTypes from 'prop-types';

import {TMemo, merge, post} from 'tinput';

import styles from './styles.js';

class Phrase extends React.Component {

    constructor(props) {
        super(props);
        this.handleIcon = this.handleIcon.bind(this);
    }

    handleIcon() {
        if (this.props.value && this.props.value.trim() !== '') {
            return;
        }
        post({
            url: '/rest/meta/texts',
            data: {id: this.props.id},
            success: (list) => {
                let value = list && list.length > 0 ? list[0] : null;
                if (this.props.onChange) {
                    this.props.onChange({
                        value: value
                    });
                }
            }
        });
    }

    render() {

        let style = merge(styles, this.props.style);

        return (
            <TMemo
                style={style}
                value={this.props.value}
                label={this.props.label}
                icon={'add'}
                autoSize={this.props.autoSize}
                onChange={this.props.onChange}
                onIcon={this.handleIcon} />
        );

    }

}

Phrase.propTypes = {
    style: PropTypes.object,
    value: PropTypes.any,
    id: PropTypes.number,
    label: PropTypes.string,
    autoSize: PropTypes.any,
    onChange: PropTypes.func
};

export default Phrase;