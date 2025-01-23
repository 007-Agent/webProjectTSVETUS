import React from 'react';
import PropTypes from 'prop-types';

import {
    TMemo,
    TButton,
    TResponse,
    TText,
    merge,
    post
} from 'tinput';

import Captcha from 'component/Captcha';

import styles from './styles.js';

const EMPTY = {
    wait: false,
    feedback: null,
    message: null,
    captcha: null
};

class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = EMPTY;
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        this.check = this.check.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.show !== this.props.show && this.props.show) {
            this.setState({EMPTY});
        }
    }

    handleShow(show) {
        if (this.props.onShow) {
            this.props.onShow({
                name: this.props.name,
                data: this.props.data,
                show: show
            });
        }
    }

    handleClick(event){
        if (event.name === 'send') {
            this.send();
        } else if (event.name === 'show') {
            this.handleShow(true);
        } else if (event.name === 'response') {
            if (event.error) {
                this.setState({error: null});
            } else {
                this.handleShow(false);
            }
        } else {
            this.handleShow(false);
        }
    }

    handleChange(event){
        this.setState({[event.name]: event.value});
    }

    check() {
        let error = null;
        if (!this.state.captcha || this.state.captcha.length < 5) {
            error = 'Введите код!'
        } else if (!this.state.feedback || this.state.feedback.length < 10) {
            error = 'Оставьте отзыв!'
        }
        if (error) {
            this.setState({error: error});
            return false;
        } else {
            return true;
        }
    }

    send(){
        if (this.check()) {
            post({
                url: '/api/office/mail/send',
                data: {
                    email: this.props.user.email,
                    text: this.state.feedback,
                    captcha: this.state.captcha
                },
                sender: this
            });
        }
    }

    render () {

        let style = merge(styles, this.props.style);

        let content = null;

        if (this.props.show) {

            content = (

                <TResponse
                    style={style.container}
                    message={this.state.message}
                    error={this.state.error}
                    wait={this.state.wait}
                    name={'response'}
                    onClose={this.handleClick} >

                    <TMemo
                        style={style.memo}
                        label={'Текст отзыва:'}
                        content={'text'}
                        wrap={true}
                        value={this.state.feedback}
                        icon={'close'}
                        name={'feedback'}
                        onIcon={this.handleClick}
                        onChange={this.handleChange}/>

                    <Captcha
                        style={style.captcha}  />

                    <TText
                        style={style.input}
                        name={'captcha'}
                        placeholder={'Введите код'}
                        value={this.state.captcha}
                        layout={'top'}
                        onKeyDown={this.handleKeyPress}
                        onChange={this.handleChange}
                        onValidate={(e) => {
                            return e.value && e.value.length >= 5;
                        }} />

                    <TButton
                        style={style.button}
                        name={'send'}
                        onClick={this.handleClick}>
                        Отправить
                    </TButton>

                </TResponse>

            );

        } else {

            content = (
                <TButton
                    style={style.button}
                    name={'show'}
                    onClick={this.handleClick}>
                    Оставить отзыв
                </TButton>
            );

        }

        return (
            <div style={style.container}>
                {content}
            </div>
        );

    }

}

Feedback.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object.isRequired,
    show: PropTypes.any,
    onShow: PropTypes.func
};

export default Feedback;
