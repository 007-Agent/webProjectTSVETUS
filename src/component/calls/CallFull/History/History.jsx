import React from 'react';
import PropTypes from 'prop-types';

import {
    TButton,
    TForm,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class History extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            wait: false,
            id: props.call.historyId,
            error: '',
            ask: false
        };
        this.save = this.save.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeError = this.closeError.bind(this);
        this.closeAsk = this.closeAsk.bind(this);
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    closeError() {
        this.setState({error: ''});
    }

    closeAsk(event) {
        if (event.button === 'save') {
            this.save();
        }
        this.setState({ask: false});
    }

    save() {

        if (!this.mounted) {
            return;
        }

        if (!this.props.enabled) {
            return;
        }

        this.setState({wait: true});

        post({
            url: '/rest/help/history/update',
            data: {id: this.props.call.id},
            success: (data) => {
                if (this.mounted) {
                    this.setState({
                        id: data,
                        ask: false,
                        wait: false
                    });
                }
            },
            fail: (status, error) => {
                if (this.mounted) {
                    this.setState({
                        error: error.message,
                        ask: false,
                        wait: false
                    });
                }
            }
        });
    }

    handleClick() {
        this.setState({ask: true});
    }

    render () {

        let style = merge(styles, this.props.style);

        let text = this.state.id > 0 ? "Создана запись в ИБ" : null;

        let caption = this.state.id > 0 ? "Обновить запись ИБ" : "Создать запись ИБ";

        let content = null;
        if (this.props.call.access > 2) {
            content = (
                <div style={style.container}>
                    <TButton
                        style={style.button}
                        name={"save"}
                        wait={this.state.wait || !this.props.enabled}
                        onClick={this.handleClick} >
                        {caption}
                    </TButton>
                    <TForm
                        style={style.form}
                        caption={'ОШИБКА'}
                        show={this.state.error != ''}
                        buttons={{close: "OK"}}
                        error={this.state.error}
                        onClose={this.closeError} >
                    </TForm>
                    <TForm
                        style={style.form}
                        caption={'ВНИМАНИЕ'}
                        show={this.state.ask}
                        wait={this.state.wait}
                        buttons={{cancel: "Нет", save: "Да"}}
                        onClose={this.closeAsk} >
                        {caption}
                    </TForm>
                </div>
            );
        }

        return (
            <div style={style.container}>
                <div style={style.text}>
                    {text}
                </div>
                {content}
            </div>
        );

    }

}

History.propTypes = {
    style: PropTypes.object,
    call: PropTypes.object.isRequired,
    enabled: PropTypes.any,
    onChange: PropTypes.func.isRequired
};

export default History;
