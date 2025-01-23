import React from 'react';
import PropTypes from 'prop-types';

import {
    TButton,
    TText,
    TForm,
    merge,
    post
} from 'tinput';

import styles from './styles.js';

class Telephone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: null,
            show: false,
            message: null,
            error: null,
            wait: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.telephone = this.telephone.bind(this);
        this.click = this.click.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange(event) {
        this.setState({[event.name]: event.value});
    }

    telephone() {
        post({
            url: 'rest/zs/sendsms',
            data: {
                recieverId: this.props.user.id,
                type: 4
            },
            success: () => {
                this.setState({show: true});
            }
        })
    }

    handleUpdate() {
        this.props.onUpdate();
    }

    click(event) {

        if (event.button === 'confirm') {

            post({
                url: 'rest/zs/confirm',
                data: this.state.code,
                sender: this,
                success: () => {
                    this.handleUpdate();
                }
            })

        } else if (event.button === 'resend') {

            post({
                url: 'rest/zs/sendsms',
                data: {recieverId: this.props.user.id, type: 4},
                sender: this
            })

        } else if (event.button === 'ok') {

            this.setState({
                show: false,
                message: null
            });

        } else if (event.button === 'continue') {

            this.setState({
                error: null
            });

        } else {

            this.setState({show: false});

        }

    }

    render () {

        let style = merge(styles, this.props.style);

        if (this.props.user.stateId < 3) {

            return (

                <div style={style.container}>

                    <TButton
                        style={style.button}
                        onClick={this.telephone}>
                        {'Подтвердить телефон'}
                    </TButton>

                    <TForm
                        style={style.form}
                        name={'telephone'}
                        show={this.state.show}
                        wait={this.state.wait}
                        buttons={{
                            confirm: "Подтвердить",
                            resend: "Запросить новый код"
                        }}
                        error={this.state.error}
                        errorButtons={{
                            continue: 'ОК'
                        }}
                        message={this.state.message}
                        messageButtons={{
                            ok: 'ОК'
                        }}
                        caption={'Введите код'}
                        onClose={this.click}>

                          <TText
                              style={style.input}
                              name={'code'}
                              value={this.state.code}
                              layout={'top'}
                              onChange={this.handleChange} />

                    </TForm>

                </div>

            );

        } else {

            return null;

        }

    }

}

Telephone.propTypes = {
    style: PropTypes.object,
    user: PropTypes.object.isRequired
};

export default Telephone;
