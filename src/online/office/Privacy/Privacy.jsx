import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    merge,
    get
} from 'tinput';

import styles from './styles.js';

class Privacy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.refresh();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    refresh() {
        get({
            url: '/policy',
            data: null,
            source: this,
            success: (content) => {
                this.setState({content: content});
            }
        });
    }

    render() {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <TPanel style={style.panel} />

                <TScroll style={style.scroll}>
                    <div style={style.text} dangerouslySetInnerHTML={{__html: this.state.content}} />
                </TScroll>

            </div>

        );
    }

}

Privacy.propTypes = {
    style: PropTypes.object
};

export default Privacy;
