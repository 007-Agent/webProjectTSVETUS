import React from 'react';
import PropTypes from 'prop-types';

import {
    TPanel,
    TScroll,
    merge
} from 'tinput';

import ProfileCheck from './ProfileCheck';

import Visits from './Visits';
import Feedback from './Feedback';

import styles from './styles.js';
import PatientCheck from "./PatientCheck";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visits: [],
            wait: false,
            showFeedback: false
        };
        this.handleFeedback = this.handleFeedback.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleFeedback(event){
        this.setState({showFeedback: event.show});
    }

    render () {

        let style = merge(styles, this.props.style);

        return (

            <div style={style.container}>

                <TPanel style={style.panel}>
                    <div style={style.text}>
                        Для начала работы нажмите на кнопку меню в левом верхнем углу
                    </div>
                </TPanel>

                <TScroll style={style.scroll}>

                    <ProfileCheck
                        style={style.check}
                        user={this.props.user}
                        onPage={this.props.onPage} />

                    <PatientCheck
                        style={style.check}
                        user={this.props.user}
                        onPage={this.props.onPage} />

                    События:

                    <Visits
                        style={style.visits}
                        user={this.props.user} />

                    <Feedback
                        style={style.feedback}
                        user={this.props.user}
                        show={this.state.showFeedback}
                        onShow={this.handleFeedback} />

                    <div style={style.support}>
                        <p>Единый телефон поддержки +7 495 727-11-66</p>
                    </div>

                </TScroll>

            </div>

        );

    }

}

Landing.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object,
    onPage: PropTypes.func
};

export default Landing;
